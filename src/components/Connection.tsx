import { nodes } from '~/components/FlowBoard';
import { createEffect, createSignal, onMount } from 'solid-js';

function getBottomCenterOfElement(x, y, width, height) {
    return { x: x + (width / 2), y: y + height };
}

function getTopCenterOfElement(x, y, width, height) {
    return { x: x + (width / 2), y: y };
}

function bezierSvgPath(startCoords, endCoords) {
    const YCenter = ((endCoords.y - startCoords.y) / 2) + startCoords.y;
    const startPath = startCoords.x + ',' + startCoords.y;
    const controlStart = startCoords.x + ',' + YCenter;
    const controlEnd = endCoords.x + ',' + YCenter;
    const endPath = endCoords.x + ',' + endCoords.y;

    return `M${startPath} C${controlStart} ${controlEnd} ${endPath}`;
}

export const Connection = (props) => {
    const [path, setPath] = createSignal('');
    const from = nodes().find(node => node.identifier === props.from);
    const to = nodes().find(node => node.identifier === props.to);

    if (!from || !to) {
        return null;
    }

    onMount(() => {
        setPath(bezierSvgPath(
            getBottomCenterOfElement(from.x, from.y, from.width, from.height),
            getTopCenterOfElement(to.x, to.y, to.width, to.height),
        ));
    });

    createEffect(() => {
        const newPath = bezierSvgPath(
            getBottomCenterOfElement(from.x, from.y, from.width, from.height),
            getTopCenterOfElement(to.x, to.y, to.width, to.height),
        );
        if (newPath !== path()) {
            setPath(newPath);
        }
    });
    return (
        <path d={path()}></path>
    );
};

