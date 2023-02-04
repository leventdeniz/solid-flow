import { children, createEffect, createSignal, For, JSX, mapArray } from 'solid-js';
import { DraggableNode } from '~/components/DraggableNode';
import { GridIndicator } from '~/components/GridIndicator';
import { MouseDebug } from '~/components/MouseDebug';
import { Setter } from 'solid-js/types/reactive/signal';
import { unwrap } from 'solid-js/store';
import { Connection } from '~/components/Connection';

export interface NodeObj {
    identifier: string,
    x: number,
    y: number,
    width: number,
    height: number,
    children: JSX.Element,
    isDraggable: boolean,
}

const rawArray: NodeObj[] = [
    { identifier: 'test1', x: 40 * 6, y: 40 * 2, children: '1', isDraggable: true, width: 80, height: 40 },
    { identifier: 'test2', x: 40 * 2, y: 40 * 4, children: '2', isDraggable: true, width: 80, height: 40 },
    { identifier: 'test3', x: 40 * 6, y: 40 * 4, children: '3', isDraggable: true, width: 80, height: 40 },
    { identifier: 'test4', x: 40 * 10, y: 40 * 4, children: '4', isDraggable: true, width: 80, height: 40 },
];

const rawConnections = [
    { from: rawArray[0].identifier, to: rawArray[1].identifier, type: 'bezier' },
    { from: rawArray[0].identifier, to: rawArray[2].identifier, type: 'bezier' },
    { from: rawArray[0].identifier, to: rawArray[3].identifier, type: 'bezier' },
];

export type SetPos = Setter<{ x: number, y: number }>
type ReturnType = Omit<NodeObj, 'y' | 'x'> & { setPos: SetPos, readonly x: number, readonly y: number };

export const nodes = mapArray<NodeObj, ReturnType>(() => rawArray, ({ x, y, ...model }) => {
    const [pos, setPos] = createSignal({ x, y });

    return {
        ...model,
        get x() {
            return pos().x;
        },
        get y() {
            return pos().y;
        },
        setPos,
    };
});
export const [gridSize, setGridSize] = createSignal(20);

export let mainContainerRef: undefined | HTMLDivElement;

export default function FlowBoard() {
    return (
        <div ref={mainContainerRef} class="w-100vw h-[70vh] overflow-hidden relative bg-base-200">
            <div class="w-full h-full top-0 left-0 absolute z-[1] origin-top-left">
                <svg
                    id="svg" width="916" height="948"
                    class="w-full h-full top-0 left-0 absolute origin-top-left overflow-visible"
                >
                    <defs></defs>
                    <g>
                        {rawConnections.map(connection => <Connection from={connection.from} to={connection.to} type={connection.type}/>)}
                    </g>
                </svg>
                <div id="nodes">
                    <For each={nodes()} fallback={<div>Loading...</div>}>
                        {(node) => (
                            <DraggableNode
                                identifier={node.identifier}
                                x={node.x}
                                y={node.y}
                                isDraggable={node.isDraggable}
                                setPos={node.setPos}
                                height={node.height}
                                width={node.width}
                            >
                                {node.children}
                            </DraggableNode>
                        )}
                    </For>
                </div>
            </div>
            <GridIndicator/>
            <MouseDebug/>
        </div>
    );
}
