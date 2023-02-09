import { createEffect, createSignal, For, JSX, mapArray } from 'solid-js';
import { DraggableNode } from '~/components/DraggableNode';
import { GridIndicator } from '~/components/GridIndicator';
import { MouseDebug } from '~/components/MouseDebug';
import { Setter } from 'solid-js/types/reactive/signal';
import type { ConnectionType } from '~/components/Connection';
import { Connection } from '~/components/Connection';
import { getBottomCenterOfElement, getLeftCenterOfElement, getRightCenterOfElement, getTopCenterOfElement } from '~/utils/coords-service';
import { Coordinate } from '~/types';

export interface NodeObj {
  identifier: string,
  x: number,
  y: number,
  width: number,
  height: number,
  children: JSX.Element,
  isDraggable: boolean,
  connectionPoints: ConnectionPoints;
}

export type ConnectionPoints = {
  top: Coordinate,
  bottom: Coordinate,
  left: Coordinate,
  right: Coordinate,
}

const connectionPoints: ConnectionPoints = {
  top: { x: 0, y: 0 },
  bottom: { x: 0, y: 0 },
  left: { x: 0, y: 0 },
  right: { x: 0, y: 0 },
};

const rawArray: NodeObj[] = [
  { identifier: 'test1', x: 40 * 6, y: 40 * 2, children: '1', isDraggable: true, width: 80, height: 40, connectionPoints },
  { identifier: 'test2', x: 40 * 2, y: 40 * 4, children: '2', isDraggable: true, width: 80, height: 40, connectionPoints },
  { identifier: 'test3', x: 40 * 6, y: 40 * 4, children: '3', isDraggable: true, width: 80, height: 40, connectionPoints },
  { identifier: 'test4', x: 40 * 10, y: 40 * 4, children: '4', isDraggable: true, width: 80, height: 40, connectionPoints },
];

const rawConnections: Array<Omit<ConnectionType, 'setFrom' | 'setTo'>> = [
  {
    from: { nodeIdentifier: rawArray[0].identifier, side: 'bottom' },
    to: { nodeIdentifier: rawArray[1].identifier, side: 'top' },
    type: 'bezier',
  },
  {
    from: { nodeIdentifier: rawArray[0].identifier, side: 'bottom' },
    to: { nodeIdentifier: rawArray[2].identifier, side: 'top' },
    type: 'bezier',
  },
  {
    from: { nodeIdentifier: rawArray[0].identifier, side: 'bottom' },
    to: { nodeIdentifier: rawArray[3].identifier, side: 'left' },
    type: 'bezier',
  },
];

export type SetPos = Setter<{ x: number, y: number }>
export type NodeObjR = Omit<NodeObj, 'y' | 'x'> & { setPos: SetPos, readonly x: number, readonly y: number };

const connections = mapArray(() => rawConnections, (model) => {
  const [from, setFrom] = createSignal(model.from);
  const [to, setTo] = createSignal(model.to);
  const [type, setType] = createSignal(model.type);

  return {
    get from() {
      return from();
    },
    get to() {
      return to();
    },
    get type() {
      return type();
    },
    setFrom,
    setTo,
  };
});

export const nodes = mapArray<NodeObj, NodeObjR>(() => rawArray, ({ x, y, ...model }) => {
  const [pos, setPos] = createSignal({ x, y });
  const [connectionPoints, setConnectionPoints] = createSignal(model.connectionPoints);

  createEffect(() => {
    setConnectionPoints({
                          top: getTopCenterOfElement(pos().x, pos().y, model.width, model.height),
                          bottom: getBottomCenterOfElement(pos().x, pos().y, model.width, model.height),
                          left: getLeftCenterOfElement(pos().x, pos().y, model.width, model.height),
                          right: getRightCenterOfElement(pos().x, pos().y, model.width, model.height),
                        });
  });

  return {
    ...model,
    get connectionPoints() {
      return connectionPoints();
    },
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
  // createEffect(() => console.log({ ...unwrap(nodes()[3]) }));
  return (
    <div ref={mainContainerRef} class="w-100vw h-[70vh] overflow-hidden relative bg-base-200">
      <div class="w-full h-full top-0 left-0 absolute z-[1] origin-top-left">
        <svg
          id="svg" width="916" height="948"
          class="w-full h-full top-0 left-0 absolute origin-top-left overflow-visible"
        >
          <defs/>
          <g>
            <For each={connections()}>
              {(connection) => (
                <Connection from={connection.from} to={connection.to} type={connection.type} setFrom={connection.setFrom} setTo={connection.setTo}/>
              )}
            </For>
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
