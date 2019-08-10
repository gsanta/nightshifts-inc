import * as React from 'react';
import { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const colorScale = d3.scaleSequential(d3.interpolateRdYlGn)
    .domain([0, 1]);


const calcProgressBarWidth = (maxWidth: number, valueInPercent: number) => {
    if (valueInPercent < 0 || valueInPercent > 1) {
        throw new Error('Progressbar value needs to be between 0 and 1');
    }

    return maxWidth * valueInPercent;
};

export const Progressbar = ({width, height, borderSize, progressInPercent}: ProgressbarProps) => {
    const containerRef = useRef(null);

    useEffect(() => {
        const progressbarWidth = calcProgressBarWidth(width - borderSize * 2, progressInPercent);

        d3.select(containerRef.current)
            .transition()
            .duration(500)
            .attr('fill', colorScale(progressInPercent))
            .attr('width', `${progressbarWidth}px`);
    });

    return (
        <svg width="100%" height="100%">
            <rect fill="grey" stroke="white" width="100%" height="100%" stroke-width="1px"/>
            <rect ref={containerRef} x={`${borderSize}px`} y={`${borderSize}px`} width={`${0}px`} height={`${height - 2 * borderSize}px`}/>
        </svg>
    );
};

export interface ProgressbarProps {
    width: number;
    height: number;
    borderSize: number;
    progressInPercent: number;
}
