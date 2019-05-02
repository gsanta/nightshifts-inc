import { ToolMesh } from './ToolMesh';
import { Scene, Mesh, StandardMaterial, MeshBuilder, Axis, Space, Color3 } from '@babylonjs/core';
import { Player } from '../world/world_items/player/Player';
import { GameConstants } from '../GameConstants';
const colors = GameConstants.colors;

export class ThermometerToolMesh implements ToolMesh {
    public name = 'thermometer';
    private mesh: Mesh;

    private materials: StandardMaterial[] = [];

    constructor(scene: Scene, player: Player) {
        this.materials = this.initMaterials(scene);
        this.mesh = MeshBuilder.CreateDisc('thermometer', {radius: 8, sideOrientation: Mesh.DOUBLESIDE}, scene);
        this.mesh.translate(Axis.Y, 1, Space.LOCAL);
        this.mesh.rotate(Axis.X, Math.PI / 2, Space.LOCAL);
        const material = new StandardMaterial('thermometer-material', scene);
        material.diffuseColor = Color3.FromHexString(colors.window);
        this.mesh.material = this.materials[0];
        this.mesh.parent = player.mesh;
        this.mesh.setEnabled(false);
    }

    public updateTemperature(temp: number) {
        if (temp <= 25) {
            this.mesh.material = this.materials[0];
        } else {
            this.mesh.material = this.materials[1];
        }
    }

    public enable() {
        this.mesh.setEnabled(true);
    }

    public disable() {
        this.mesh.setEnabled(false);
    }

    private initMaterials(scene: Scene): StandardMaterial[] {
        const cold = new StandardMaterial('thermometer-material', scene);
        cold.diffuseColor = Color3.FromHexString(colors.cold);

        const warm = new StandardMaterial('thermometer-material', scene);
        warm.diffuseColor = Color3.FromHexString(colors.warm);
        return [
            cold, warm
        ];
    }
}
