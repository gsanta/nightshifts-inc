import { ToolMesh } from './ToolMesh';
import { Scene, Mesh, StandardMaterial } from 'babylonjs';
import { Player } from '../../game/model/creature/type/Player';
import { GameConstants } from '../../game/GameConstants';
const colors = GameConstants.colors;

export class ThermometerToolMesh implements ToolMesh {
    public name = 'thermometer';
    private mesh: Mesh;

    constructor(scene: Scene, player: Player) {
        this.mesh = BABYLON.MeshBuilder.CreateDisc('thermometer', {radius: 8, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene);
        this.mesh.translate(BABYLON.Axis.Y, 1, BABYLON.Space.LOCAL);
        this.mesh.rotate(BABYLON.Axis.X, Math.PI / 2, BABYLON.Space.LOCAL);
        const material = new StandardMaterial('thermometer-material', scene);
        material.diffuseColor = BABYLON.Color3.FromHexString(colors.window);
        this.mesh.material = material;
        this.mesh.parent = player.mesh.wrappedMesh;
        this.mesh.setEnabled(false);
    }

    public enable() {
        this.mesh.setEnabled(true);
    }

    public disable() {
        this.mesh.setEnabled(false);
    }
}
