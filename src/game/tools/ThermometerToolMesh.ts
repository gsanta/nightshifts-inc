import { ToolMesh } from './ToolMesh';
import { Scene, Mesh, StandardMaterial } from 'babylonjs';
import { Player } from '../world_items/Player';
import { GameConstants } from '../GameConstants';
const colors = GameConstants.colors;

export class ThermometerToolMesh implements ToolMesh {
    public name = 'thermometer';
    private mesh: Mesh;

    private materials: StandardMaterial[] = [];

    constructor(scene: Scene, player: Player) {
        this.materials = this.initMaterials(scene);
        this.mesh = BABYLON.MeshBuilder.CreateDisc('thermometer', {radius: 8, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene);
        this.mesh.translate(BABYLON.Axis.Y, 1, BABYLON.Space.LOCAL);
        this.mesh.rotate(BABYLON.Axis.X, Math.PI / 2, BABYLON.Space.LOCAL);
        const material = new StandardMaterial('thermometer-material', scene);
        material.diffuseColor = BABYLON.Color3.FromHexString(colors.window);
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
        cold.diffuseColor = BABYLON.Color3.FromHexString(colors.cold);

        const warm = new StandardMaterial('thermometer-material', scene);
        warm.diffuseColor = BABYLON.Color3.FromHexString(colors.warm);
        return [
            cold, warm
        ];
    }
}
