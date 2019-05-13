import { ToolIcon } from './ToolIcon';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import * as React from 'react';

export class CameraToolIcon implements ToolIcon {
    private carrying = false;

    constructor(carrying = false) {
        this.carrying = carrying;
    }

    public getIcon(iconSize: number): JSX.Element {
        return (
            <PhotoCamera style={{width: `${iconSize}px`, height: `${iconSize}px`}}/>
        );
    }

    public getName() {
        return 'flashlight';
    }

    public isCarrying() {
        return this.carrying;
    }

    public setCarrying(carrying: boolean): ToolIcon {
        return new CameraToolIcon(carrying);
    }
}
