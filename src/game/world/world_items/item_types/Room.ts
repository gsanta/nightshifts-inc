import { Mesh } from '@babylonjs/core';
import { Polygon } from '@nightshifts.inc/geometry';
import { ContainerWorldItem } from './ContainerWorldItem';
import { WorldItem } from './WorldItem';
import { VectorModel } from '../../../model/core/VectorModel';
import { Door } from './Door';


export class Room extends ContainerWorldItem {
    public borderItems: WorldItem[] = [];
    public mesh: Mesh;
    public type: string;
    public temperature = 20 + Math.floor(Math.random() * 10);
    public isActive: boolean;
    public lampBehaviour: 'offAlways' | 'onAlways' | 'onWhenActive' | 'flashesWhenEntering' = 'onWhenActive';

    constructor(mesh: Mesh, boundingPolygon: Polygon, name: string) {
        super([]);
        this.type = name;
        this.mesh = mesh;
        this.boundingBox = boundingPolygon;
    }

    public getAllMeshes(): Mesh[] {
        return [this.mesh, ...super.getAllMeshes()];
    }

    public getBoundingBox(): Polygon {
        return this.boundingBox;
    }

    public getCenterPosition(): VectorModel {
        const center = this.boundingBox.getBoundingCenter();
        return new VectorModel(center.x, 0, center.y);
    }

    public getDoors(): Door[] {
        return <Door[]> this.borderItems.filter(child => child instanceof Door);
    }
}
