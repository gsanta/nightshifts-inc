import { Orientation } from '../../model/utils/Orientation';
import { Direction } from '../../model/utils/Direction';
import { Tools } from '@babylonjs/core';

export interface AdditionalData {
    pos?: {
        x: number,
        y: number
    };
    orientation?: Orientation;
    dock?: Direction;
    axis?: {
        x: number,
        y: number
    };
    axis1?: {
        x: number,
        y: number
    };
    axis2?: {
        x: number,
        y: number
    };
    angle?: number;
}

export const parseJsonAdditionalData = (additionalData): AdditionalData => {
    if (!additionalData) {
        return undefined;
    }

    if (additionalData.dock) {
        additionalData.dock = Direction[additionalData.dock];
    }

    if (additionalData.orientation) {
        additionalData.orientation = Orientation[additionalData.orientation];
    }

    if (additionalData.angle) {
        additionalData.angle = Tools.ToRadians(additionalData.angle);
    }

    if (additionalData.axis) {
        additionalData.axis = {
            x: parseInt(additionalData.axis.x, 10),
            y: parseInt(additionalData.axis.y, 10)
        };
    }

    return additionalData;
};
