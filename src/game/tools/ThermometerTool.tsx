import { Tool } from './Tool';
import styled from 'styled-components';
import * as React from 'react';
const thermometer = require('../../../assets/images/thermometer.png');

export const ThermometerIconStyled = styled.div`
    width: ${(props: {size: number}) => props.size}px;
    height: ${(props: {size: number}) => props.size}px;
    background-image: url(${thermometer});
`;

export class ThermometerTool implements Tool {
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

    public setCarrying(carrying: boolean): Tool {
        return new ThermometerTool(carrying);
    }
}
