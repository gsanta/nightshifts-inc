
import { Mesh, Skeleton, Space, PhysicsImpostor, Scene, MeshBuilder, Vector3, StandardMaterial, Color3, Axis } from '@babylonjs/core';
import { Polygon } from '@nightshifts.inc/geometry';
import { GameObject } from '../item_types/GameObject';

export class ModelFactory {
    public meshInfo: [Mesh[], Skeleton[]];
    private scene: Scene;

    constructor(meshInfo: [Mesh[], Skeleton[]], scene: Scene) {
        this.meshInfo = meshInfo;
        this.scene = scene;
    }

    public createItem(meshes: Mesh[], boundingBox: Polygon, rotation: number): GameObject {
        meshes[0].isVisible = true;
        meshes[0].translate(new Vector3(0, 15, 0), 1);

        boundingBox = boundingBox.negate('y');
        // boundingBox = boundingBox.translate(new Point(-boundingBox.getBoundingInfo().extent[0] / 2, boundingBox.getBoundingInfo().extent[1] / 2));

        const meshModel = new GameObject(meshes[0], boundingBox, {type: meshes[0].name});
        meshes[0].rotate(Axis.Y, rotation, Space.WORLD);
        meshModel.setBoudingBox(boundingBox);

        const mesh = this.createMesh(meshModel, this.scene);
        mesh.checkCollisions = true;
        mesh.isVisible = false;
        meshModel.boundingMesh = mesh;

        const impostor = new PhysicsImpostor(mesh, PhysicsImpostor.BoxImpostor, { mass: 2, friction: 1, restitution: 0.3 }, this.scene);
        mesh.physicsImpostor = impostor;

        // mesh.setImpostor(impostor);

        return meshModel;
    }


    private createMesh(worldItem: GameObject, scene: Scene): Mesh {
        const boundingPolygon = worldItem.boundingBox;

        const box = MeshBuilder.CreateBox(
            `bounding-box`,
            {  width: boundingPolygon.getBoundingInfo().extent[0], depth: boundingPolygon.getBoundingInfo().extent[1], height: worldItem.getHeight()  },
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
