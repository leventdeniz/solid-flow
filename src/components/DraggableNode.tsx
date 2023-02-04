import { children, Component, createSignal, JSX, JSXElement } from 'solid-js';
import { gridSize, mainContainerRef, SetPos } from '~/components/FlowBoard';

interface NodeProps {
    identifier: string,
    x: number,
    y: number,
    width: number,
    height: number,
    children: JSX.Element,
    isDraggable: boolean;
    setPos: SetPos;
}

export const DraggableNode: Component<NodeProps> = (props) => {
    const childrenResolver = children(() => props.children)
    const [isMouseDown, setIsMouseDown] = createSignal(false);


    const onMouseDown = (event: MouseEvent) => {
        event.preventDefault();
        setIsMouseDown(true);
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    }
    const onMouseUp = (event: MouseEvent) => {
        event.preventDefault();
        setIsMouseDown(false);
        document.removeEventListener('mousemove', onMouseMove);
    }

    function onMouseMove(event: MouseEvent) {
        event.preventDefault();
        const newSnapX = (Math.round((event.clientX - (mainContainerRef?.offsetLeft ?? 0)) / gridSize()) * gridSize()) - props.width / 2;
        const newSnapY = (Math.round((event.clientY - (mainContainerRef?.offsetTop ?? 0)) / gridSize()) * gridSize()) - props.height / 2;
        if (newSnapY !== props.y || newSnapX !== props.x) {
            props.setPos((v) => ({ x: newSnapX, y: newSnapY }));
        }
    }

    return (
        <div
            onmousedown={onMouseDown}
            onmouseup={onMouseUp}
            data-id={props.identifier}
            style={{
                transform: `translate(${props.x}px, ${props.y}px)`,
                width: `${props.width}px`,
                height: `${props.height}px`,
                "line-height": `${props.height - 2}px`,
                cursor: isMouseDown() ? 'grabbing' : '',
                outline: isMouseDown() ? '2px solid #1940B9' : ''
            }}
            class={`card bg-base-100 shadow-l text-center border absolute cursor-grab select-none pointer-events-auto rounded-md`}
        >
            {childrenResolver()}
        </div>
    );
};
