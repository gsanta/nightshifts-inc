import { Sensor } from './Sensor';
import { Scene, StandardMaterial } from 'babylonjs';
import { Creature } from '../type/Creature';
import { VectorModel } from '../../core/VectorModel';
declare const DEBUG: boolean;

export class HearingSensor implements Sensor {
    private hearingCreature: Creature;
    private scene: Scene;
    private enemySensorRangeMaterial: StandardMaterial = null;
    private range = 20;
    private isVisible = false;

    constructor(creature: Creature, scene: Scene) {
        this.hearingCreature = creature;
        this.scene = scene;

        this.initMaterial();

        const torus = BABYLON.MeshBuilder.CreateTorus('torus', {thickness: 0.2, diameter: this.range * 2, tessellation: 30}, scene);
        torus.material = this.enemySensorRangeMaterial;
        torus.parent = creature.getBody();
        torus.checkCollisions = false;
        torus.isPickable = false;
    }

    public testIsWithinRange(testingCreature: Creature) {
        const hearingCreaturePos = this.hearingCreature.getPosition();
        const testingCreaturePos = testingCreature.getPosition();

        const distance = VectorModel.Distance(hearingCreaturePos, testingCreaturePos);
        if (distance < this.range) {
            return true;
        }
        return false;
    }

    public setIsVisible(isVisible: boolean) {
        this.isVisible = isVisible;

        if (isVisible) {
            this.enemySensorRangeMaterial.alpha = 1;
        } else {
            this.enemySensorRangeMaterial.alpha = 0;
        }
    }

    private initMaterial() {
        this.enemySensorRangeMaterial = new StandardMaterial('enemy-sensor-range-material', this.scene);
        this.enemySensorRangeMaterial.emissiveColor = new BABYLON.Color3(1, 0, 0);

        if (DEBUG) {
            this.enemySensorRangeMaterial.alpha = 1;
        } else {
            this.enemySensorRangeMaterial.alpha = 0;
        }
    }
}
