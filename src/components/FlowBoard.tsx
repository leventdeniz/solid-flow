import { createSignal, For } from 'solid-js';
import { DraggableNode } from '~/components/DraggableNode';
import { GridIndicator } from '~/components/GridIndicator';
import { MouseDebug } from '~/components/MouseDebug';

const nodes = [
    { identifier: 'test1', x: 40 * 6, y: 40 * 2, children: '1', isDraggable: true },
    { identifier: 'test2', x: 40 * 2, y: 40 * 4, children: '2', isDraggable: true },
    { identifier: 'test3', x: 40 * 6, y: 40 * 4, children: '3', isDraggable: true },
    { identifier: 'test4', x: 40 * 10, y: 40 * 4, children: '4', isDraggable: true },
];

export const [gridSize, setGridSize] = createSignal(20);

export let mainContainerRef: undefined | HTMLDivElement;

export default function FlowBoard() {
    return (
        <div ref={mainContainerRef} class="w-100vw h-[70vh] overflow-hidden relative bg-base-200" >
            <div class="w-full h-full top-0 left-0 absolute z-[1] origin-top-left">
                <svg
                    id="svg" width="916" height="948"
                    class="w-full h-full top-0 left-0 absolute origin-top-left overflow-visible"
                >
                    <defs></defs>
                    <g></g>
                </svg>
                <div id="nodes">
                    <For each={nodes} fallback={<div>Loading...</div>}>
                        {({ children, ...props }) => <DraggableNode  {...props} >{children}</DraggableNode>}
                    </For>
                </div>
            </div>
            <GridIndicator/>
            <MouseDebug />
        </div>
    );
}
