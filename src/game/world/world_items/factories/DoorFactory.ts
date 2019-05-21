import { GwmWorldItem } from '@nightshifts.inc/world-generator';
import { GwmItemImporter } from '../../world_factory/GwmItemImporter';
import { Scene, StandardMaterial, Color3, Mesh, MeshBuilder, Vector3, Space, PhysicsImpostor } from '@babylonjs/core';
import { AdditionalData } from '../../world_import/AdditionalData';
import { World } from '../../World';
import { WorldItem } from '../item_types/WorldItem';
import { Door } from '../item_types/Door';
import { GameConstants } from '../../../GameConstants';
const colors = GameConstants.colors;

export class DoorFactory implements GwmItemImporter {
    private scene: Scene;
    private material: StandardMaterial;

    constructor(scene: Scene) {
        this.scene = scene;
        this.material = this.createMaterial();
    }

    public createItem(worldItem: GwmWorldItem<AdditionalData>, world: World): WorldItem {
        const door = Door.fromGwmWorldItem(worldItem, this.scene, world);
        door.material = this.material;

        // const mesh = this.createMesh(door, this.scene);

        // const impostor = new PhysicsImpostor(mesh, PhysicsImpostor.PlaneImpostor, { mass: 0, friction: 1, restitution: 0.7 }, this.scene);
        // mesh.physicsImpostor = impostor;
        // mesh.isVisible = true;

        return door;
    }

    private createMaterial(): StandardMaterial {
        const doorMaterial = new StandardMaterial('door-material', this.scene);
        doorMaterial.diffuseColor = Color3.FromHexString(colors.door);
        return doorMaterial;
    }

    private createMesh(worldItem: WorldItem, scene: Scene): Mesh {
        const boundingPolygon = worldItem.getBoundingBox();

        const box = MeshBuilder.CreateBox(
            `bounding-box-ignore-collision`,
            {  width: boundingPolygon.width, depth: boundingPolygon.height, height: worldItem.getHeight()  },
            scene
        );

        const center = boundingPolygon.getBoundingCenter();
        box.translate(new Vector3(center.x, worldItem.getHeight() / 2, center.y), 1, Space.WORLD);

        const material = new StandardMaterial('box-material', scene);
        material.diffuseColor = Color3.FromHexString('#00FF00');
        material.alpha = 0.5;
        material.wireframe = false;
        box.material = material;
        box.isVisible = true;

        return box;
    }
}
