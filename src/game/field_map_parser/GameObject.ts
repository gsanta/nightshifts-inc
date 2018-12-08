import { Rectangle } from '../model/core/SceneModel';

export class GameObject {
    public type: string;
    public dimensions: Rectangle;

    constructor(type: string, dimensions: Rectangle) {
        this.type = type;
        this.dimensions = dimensions;
    }
}
