import { GameObject } from './GameObject';
import { Mesh, AbstractMesh } from 'babylonjs';
import { Shape } from '@nightshifts.inc/geometry';
import { Border } from './Border';
import { World } from './World';
import _ from 'lodash';


export class Room extends GameObject {
    borders: Border[] = [];
    isActive: boolean;
    lightsWorking: boolean = true;

    private world: World;

    constructor(meshes: Mesh[], boundingBox: Shape, world: World) {
        super(meshes, boundingBox, {type: 'room'});
        this.world = world;
    }

    displayRoof() {
        // this.meshes[1].isVisible = true;
    }

    hideRoof() {
        // this.meshes[1].isVisible = false;
    }

    switchLights(on: boolean) {
        const meshes = _.chain([this, ...this.children, ...this.borders]).map(item => [...item.meshes]).flatten().value();

        if (on) {
            this.addToWorldLight(meshes, this.world);
        } else {
            this.removeFromWorldLight(meshes, this.world);
        }
    }

    private removeFromWorldLight(meshes: AbstractMesh[], world: World) {
        // this.world.environmentLight.intensity = 0.1;
        meshes.filter(mesh => mesh.name !== 'room-label')
        .forEach(mesh => {
            if (world.environmentLight.excludedMeshes.indexOf(mesh)) {
                world.environmentLight.excludedMeshes.push(mesh);
            }
        });
    }

    private addToWorldLight(meshes: AbstractMesh[], world: World) {
        meshes.filter(mesh => mesh.name !== 'room-label')
        .forEach(mesh => {
            const index = world.environmentLight.excludedMeshes.indexOf(mesh);
            if (index !== -1) {
                world.environmentLight.excludedMeshes.splice(index, 1);
            }
        });
    }
}
