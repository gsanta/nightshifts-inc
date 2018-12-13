import { Rectangle } from 'game-worldmap-generator';

export class GameObject {
    public type: string;
    public dimensions: Rectangle;

    constructor(type: string, dimensions: Rectangle) {
        this.type = type;
        this.dimensions = dimensions;
    }
}
