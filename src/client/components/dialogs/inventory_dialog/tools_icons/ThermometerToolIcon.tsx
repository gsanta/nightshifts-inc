import { ToolIcon } from './ToolIcon';
import styled from 'styled-components';
import * as React from 'react';
const thermometer = require('../../../../../../assets/images/thermometer.png');

export const ThermometerIconStyled = styled.div`
    width: ${(props: {size: number}) => props.size}px;
    height: ${(props: {size: number}) => props.size}px;
    background-image: url(${thermometer});
    background-position: center;
    background-size: contain;
`;

export class ThermometerToolIcon implements ToolIcon {
    private carrying: boolean;

    constructor(carrying = false) {
        this.carrying = carrying;
    }

    public getIcon(iconSize: number): JSX.Element {
        return (
            <ThermometerIconStyled size={iconSize}/>
        );
    }

    public getName() {
        return 'thermometer';
    }

    public isCarrying() {
        return this.carrying;
    }

    public setCarrying(carrying: boolean): ToolIcon {
        return new ThermometerToolIcon(carrying);
    }
}
