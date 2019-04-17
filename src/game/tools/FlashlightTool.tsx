import { Tool } from './Tool';
import { Highlight } from '@material-ui/icons';
import * as React from 'react';

export class FlashlightTool implements Tool {
    private carrying = false;

    constructor(carrying = false) {
        this.carrying = carrying;
    }

    public getIcon(iconSize: number): JSX.Element {
        return (
            <Highlight style={{width: `${iconSize}px`, height: `${iconSize}px`}}/>
        );
    }

    public getName() {
        return 'flashlight';
    }

    public isCarrying() {
        return this.carrying;
    }

    public setCarrying(carrying: boolean): Tool {
        return new FlashlightTool(carrying);
    }
}
