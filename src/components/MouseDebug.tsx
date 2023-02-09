import { Component, createEffect, createSignal, onCleanup, onMount } from 'solid-js';
import { mainContainerRef } from '~/components/FlowBoard';

const MainContainerDebug: Component = () => {
  if (!mainContainerRef) {
    return null;
  }
  onMount(() => console.log(mainContainerRef!.offsetLeft));

  return (
    <>
      <div style={{ transform: `translate(${mainContainerRef.clientLeft + 20}px, ${mainContainerRef.clientTop}px)` }} class="z-50 absolute">
        x: {mainContainerRef.offsetLeft}
      </div>
      <div style={{ transform: `translate(${mainContainerRef.clientLeft}px, ${mainContainerRef.clientTop + 20}px)` }} class="z-50 absolute">
        y: {mainContainerRef.offsetTop}
      </div>
    </>
  );
};

export const MouseDebug: Component = () => {
  const [pos, setPos] = createSignal({ x: 0, y: 0 });

  function handleMouseMove(event: MouseEvent) {
    setPos({
      x: event.clientX - (mainContainerRef?.offsetLeft ?? 0),
      y: event.clientY - (mainContainerRef?.offsetTop ?? 0),
    });
  }

  onMount(() => document.addEventListener('mousemove', handleMouseMove));
  onCleanup(() => document.removeEventListener('mousemove', handleMouseMove));

  return (
    <>
      <div style={{ transform: `translate(${pos().x + 20}px, ${pos().y}px)` }} class="z-50 absolute">
        x: {pos().x}
      </div>
      <div style={{ transform: `translate(${pos().x}px, ${pos().y + 20}px)` }} class="z-50 absolute">
        y: {pos().y}
      </div>
      {/*<MainContainerDebug />*/}
    </>
  );
};
