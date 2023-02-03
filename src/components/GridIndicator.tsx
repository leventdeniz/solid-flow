import { Component } from 'solid-js';
import { gridSize } from '~/components/FlowBoard';

export const GridIndicator: Component = () => {
    return (
        <svg style="position: absolute; width: 100%; height: 100%; top: 0px; left: 0px; z-index: 0">
            <pattern id="pattern-hero" x="0" y="0" width={gridSize()} height={gridSize()} patternUnits="userSpaceOnUse" patternTransform="translate(-1,-1)">
                <circle cx="1" cy="1" r="1" fill="#b4b4b4"></circle>
            </pattern>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-hero)"></rect>
        </svg>
    );
};
