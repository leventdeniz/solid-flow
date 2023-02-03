import { children, Component, createSignal, JSX, JSXElement } from 'solid-js';
import { gridSize, mainContainerRef } from '~/components/FlowBoard';

interface NodeProps {
    identifier: string,
    x: number,
    y: number,
    children: JSX.Element,
    isDraggable: boolean
}

export const DraggableNode: Component<NodeProps> = ({ identifier, x, y, children: _children, isDraggable }) => {
    const childrenResolver = children(() => _children)
    const [pos, setPos] = createSignal({x, y});
    const width = 80;
    const height = 40;
    let componentRef: HTMLDivElement | undefined;


    const onMouseDown = (event: MouseEvent) => {
        event.preventDefault();
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    }
    const onMouseUp = (event: MouseEvent) => {
        event.preventDefault();
        document.removeEventListener('mousemove', onMouseMove);
        if (!componentRef) return
        componentRef.style.outline = `none`;
        componentRef.style.cursor = `grab`;
    }

    function onMouseMove(event: MouseEvent) {
        event.preventDefault();
        if (!componentRef) return
        //debugSnapPoints(draggedElement)

        //diffToLastMouseEventCoords.x = lastRecordedMousePosition.x - event.clientX;
        //console.log(diffToLastMouseEventCoords.x);

        //if (event.clientX % 40 <= 7 || event.clientX % 40 >= 32) {

        //if (event.clientX % 40 === 0) {
        //const newX = eleClientRect.x - diffToLastMouseEventCoords.x;
        const newSnapX = (Math.round((event.clientX - (mainContainerRef?.offsetLeft ?? 0)) / gridSize()) * gridSize()) - width / 2;
        const newSnapY = (Math.round((event.clientY - (mainContainerRef?.offsetTop ?? 0)) / gridSize()) * gridSize()) - height / 2;
        //lastRecordedMousePosition.x = event.clientX;
        setPos({ x: newSnapX, y: newSnapY })
        //componentRef.style.transform = `translate(${newSnapX}px, ${newSnapY}px)`;
        componentRef.innerText = `${newSnapX}`;
        //}
        componentRef.style.cursor = `grabbing`;
        componentRef.style.outline = `2px solid #1940B9`;
    }

    return (
        <div
            ref={componentRef!}
            onmousedown={onMouseDown}
            onmouseup={onMouseUp}
            data-id={identifier}
            style={{
                transform: `translate(${pos().x}px, ${pos().y}px)`,
                width: `${width}px`,
                height: `${height}px`,
                "line-height": `${height - 2}px`,
            }}
            class={`card bg-base-100 shadow-l text-center border absolute cursor-grab select-none pointer-events-auto rounded-md`}
        >
            {childrenResolver()}
        </div>
    );
};
