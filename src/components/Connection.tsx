import { gridSize, mainContainerRef, NodeObj, NodeObjR, nodes } from '~/components/FlowBoard';
import { createEffect, createSignal, onMount } from 'solid-js';
import { getBottomCenterOfElement, getTopCenterOfElement } from '~/utils/coords-service';
import { Coordinate, Side } from '~/types';
import { Setter } from 'solid-js/types/reactive/signal';
import { unwrap } from 'solid-js/store';

function bezierSvgPath(startCoords: Coordinate, endCoords: Coordinate) {
    const YCenter = ((endCoords.y - startCoords.y) / 2) + startCoords.y;
    const startPath = startCoords.x + ',' + startCoords.y;
    const controlStart = startCoords.x + ',' + YCenter;
    const controlEnd = endCoords.x + ',' + YCenter;
    const endPath = endCoords.x + ',' + endCoords.y;

    return `M${startPath} C${controlStart} ${controlEnd} ${endPath}`;
}

interface ConnectionDetails {
    nodeIdentifier: NodeObj['identifier'],
    side: Side
}

export interface Connection {
    from: ConnectionDetails;
    to: ConnectionDetails;
    setFrom: Setter<Connection['from']>;
    setTo: Setter<Connection['to']>;
    type: 'bezier';
}

const EndPoint = (props: { pos: Coordinate, onMouseDown: (e: MouseEvent) => void }) => {

    return (
        <circle
            onmousedown={props.onMouseDown}
            r={6}
            cx={props.pos.x}
            cy={props.pos.y}
        />
    );
};

export const Connection = (props: Connection) => {
    const [isMouseDown, setIsMouseDown] = createSignal(false);
    const [path, setPath] = createSignal('');
    const [newPathStartCoords, setNewPathStartCoords] = createSignal({ x: 0, y: 0 });
    const [newPathEndCoords, setNewPathEndCoords] = createSignal({ x: 0, y: 0 });
    const [newPath, setNewPath] = createSignal('');
    const [_from, setFrom] = createSignal();
    const [to, setTo] = createSignal<undefined | NodeObjR>(nodes().find(node => node.identifier === props.to.nodeIdentifier));

    const from = nodes().find(node => node.identifier === props.from.nodeIdentifier);
    // const to = nodes().find(node => node.identifier === props.to.nodeIdentifier);
    onMount(() => setTo(nodes().find(node => node.identifier === props.to.nodeIdentifier)));
    createEffect(() => setTo(nodes().find(node => node.identifier === props.to.nodeIdentifier)));
    // createEffect(() => console.log(to(), props.to.nodeIdentifier));

    if (!from || !to()) {
        return null;
    }

    const onToMouseDown = (event: MouseEvent) => {
        event.preventDefault();
        setIsMouseDown(true);
        setNewPathStartCoords(from.connectionPoints[props.from.side]);
        setNewPathEndCoords(to()!.connectionPoints[props.to.side]);
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    };

    function onMouseMove(event: MouseEvent) {
        event.preventDefault();

        setNewPathEndCoords({
                                x: (newPathEndCoords()?.x ?? 0) + event.movementX,
                                y: (newPathEndCoords()?.y ?? 0) + event.movementY,
                            });
        setNewPath(bezierSvgPath(newPathStartCoords(), newPathEndCoords()));
        // props.setPos((v) => ({ x: newSnapX, y: newSnapY }));
    }

    const onMouseUp = (event: MouseEvent) => {
        event.preventDefault();
        // @ts-ignore
        const targetIdentifier = event.target && 'dataset' in event.target ? event.target?.dataset?.identifier : null;
        if (targetIdentifier) {
            const targetIdParts = targetIdentifier.split(':');
            if (targetIdParts[0] === 'conTarget') {
                // console.log({ newTo: targetIdParts[1], newSide: targetIdParts[2] });
                props.setTo({ nodeIdentifier: targetIdParts[1], side: targetIdParts[2] });
            }
        }
        // console.log(targetIdentifier);
        setIsMouseDown(false);
        setNewPath('');
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    };

    onMount(() => {
        setPath(bezierSvgPath(
            from.connectionPoints[props.from.side],
            to()!.connectionPoints[props.to.side],
        ));
    });

    createEffect(() => {
        const newPath = bezierSvgPath(
            from.connectionPoints[props.from.side],
            to()!.connectionPoints[props.to.side],
        );

        if (newPath !== path()) {
            setPath(newPath);
        }
    });

    return (
        <>
            <path d={path()}></path>
            {newPath() ? <path d={newPath()} style={{ stroke: '#3f51b580' }}></path> : null}
            <EndPoint
                pos={to()!.connectionPoints[props.to.side]}
                onMouseDown={onToMouseDown}
            />
        </>
    );
};

