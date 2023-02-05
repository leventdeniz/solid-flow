import { children, Component, createSignal, JSX, JSXElement } from 'solid-js';
import { gridSize, mainContainerRef, SetPos } from '~/components/FlowBoard';
import { Side } from '~/types';

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

const ConnectionTarget = (props: { position: Side, parentId: NodeProps["identifier"] }) => {

    let positionClasses = "top-[-1px] left-[calc(50%-3px)] text-center"

    if (props.position === "bottom") {
        positionClasses = "bottom-[-1px] left-[calc(50%-3px)] text-center"
    }
    if (props.position === "left") {
        positionClasses = "top-[calc(50%-3px)] left-[-1px] text-center"
    }
    if (props.position === "right") {
        positionClasses = "top-[calc(50%-3px)] right-[-1px] text-center"
    }

    return (
        <div class={'group z-[2] absolute leading-[0] ' + positionClasses}>
            <svg
                viewBox="0 0 2 2" xmlns="http://www.w3.org/2000/svg"
                class="inline-block fill-[#3f51b580] group-hover:fill-[#3f51b5] group-hover:scale-150"
                width="6px"
                height="6px"
            >
                <circle data-identifier={`conTarget:${props.parentId}:${props.position}`} r={1} cx={1} cy={1}/>
            </svg>
        </div>
    );
};

export const DraggableNode: Component<NodeProps> = (props) => {
    const childrenResolver = children(() => props.children);
    const [isMouseDown, setIsMouseDown] = createSignal(false);

    const onMouseDown = (event: MouseEvent) => {
        event.preventDefault();
        setIsMouseDown(true);
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    };
    const onMouseUp = (event: MouseEvent) => {
        event.preventDefault();
        setIsMouseDown(false);
        document.removeEventListener('mousemove', onMouseMove);
    };

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
            style={{
            transform: `translate(${props.x}px, ${props.y}px)`,
            width: `${props.width}px`,
            height: `${props.height}px`,
        }}
             class="absolute z-[1]"
        >
            <div
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
                data-id={props.identifier}
                style={{

                    'line-height': `${props.height - 2}px`,
                    cursor: isMouseDown() ? 'grabbing' : '',
                    outline: isMouseDown() ? '2px solid #1940B9' : '',
                }}
                class={`card bg-base-100 shadow-l text-center border cursor-grab select-none pointer-events-auto rounded-md`}
            >
                {childrenResolver()}
            </div>
            <ConnectionTarget position="top" parentId={props.identifier}/>
            <ConnectionTarget position="bottom" parentId={props.identifier}/>
            <ConnectionTarget position="left" parentId={props.identifier}/>
            <ConnectionTarget position="right" parentId={props.identifier}/>
        </div>
    );
};
