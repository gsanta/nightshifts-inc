import { toVector3, VectorModel } from '../core/VectorModel';

export class Vector2Model {
    private _x: number;
    private _y: number;

    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }


    public x() {
        return this._x;
    }

    public y() {
        return this._y;
    }

    public add(vector2Model: Vector2Model): Vector2Model {
        return new Vector2Model(this._x + vector2Model._x, this._y + vector2Model._y);
    }

    public toVector3(y = 0): VectorModel {
        return new VectorModel(this.x(), y, this.y());
    }
}