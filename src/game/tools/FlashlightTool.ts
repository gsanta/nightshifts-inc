import { Tool } from './Tool';
import { SpotLight, Scene, ShadowGenerator, Vector3, Color3 } from '@babylonjs/core';
import { World } from '../world/World';
import { Window } from '../world/world_items/item_types/Window';
import { Player } from '../world/world_items/item_types/Player';

export class FlashlightTool implements Tool {
    public name = 'flashlight';
    private flashLight: SpotLight;
    private player: Player;

    constructor(scene: Scene, world: World) {
        this.flashLight = this.createFlashLight(scene, world);
        this.player = world.player;
    }

    public enable() {
        this.flashLight.setEnabled(true);
        this.flashLight.parent = this.player.mesh;
    }

    public disable() {
        this.flashLight.setEnabled(false);
        this.flashLight.parent = null;
    }

    private createFlashLight(scene: Scene, world: World) {
        const spotLight = new SpotLight('spot-light', new Vector3(0, 7, 1), new Vector3(0, 0, -5), Math.PI / 4, 3, scene);
        const shadowGenerator = this.createShadowGenerator(spotLight);

        spotLight.diffuse = new Color3(1, 1, 1);
        spotLight.setEnabled(false);


        this.addMeshesToShadowGenerator(shadowGenerator, world);


        return spotLight;
    }

    private createShadowGenerator(spotLight: SpotLight): ShadowGenerator {
        const shadowGenerator = new ShadowGenerator(1024, spotLight);
        shadowGenerator.usePoissonSampling = true;

        return shadowGenerator;
    }

    // TODO refactor this to make it more general
    private addMeshesToShadowGenerator(shadowGenerator: ShadowGenerator, world: World) {
        world.worldItems.filter(worldItem => worldItem.type === 'window').forEach(item => {
            shadowGenerator.getShadowMap().renderList.push(item.mesh.getChildMeshes()[0]);
            shadowGenerator.getShadowMap().renderList.push(item.mesh.getChildMeshes()[1]);
        });

        world.worldItems.filter(worldItem => worldItem.type === 'room').forEach(room => {
            shadowGenerator.getShadowMap().renderList.push(room.mesh);
        });

        world.worldItems.filter(worldItem => worldItem.type === 'door').forEach(door => {
            shadowGenerator.getShadowMap().renderList.push(door.mesh.getChildMeshes()[0]);
            shadowGenerator.getShadowMap().renderList.push(door.mesh.getChildMeshes()[1]);
        });

        world.worldItems.filter(worldItem => worldItem instanceof Window).forEach((window: Window) => {
            shadowGenerator.getShadowMap().renderList.push(window.getChildren()[0].mesh);
            shadowGenerator.getShadowMap().renderList.push(window.getChildren()[1].mesh);
        });

        world.worldItems.filter(worldItem => worldItem.type === 'empty').forEach(emptyArea => {
            shadowGenerator.getShadowMap().renderList.push(emptyArea.mesh);
        });
    }
}
