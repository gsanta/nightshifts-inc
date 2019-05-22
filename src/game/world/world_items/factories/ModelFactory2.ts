
import { Mesh, Skeleton, Space, PhysicsImpostor, Scene, MeshBuilder, Vector3, StandardMaterial, Color3 } from '@babylonjs/core';
import { Polygon } from '@nightshifts.inc/geometry';
import { SimpleWorldItem } from '../item_types/SimpleWorldItem';
import { WorldItem } from '../item_types/WorldItem';
import { VectorModel, toVector3 } from '../../../model/core/VectorModel';
import { World } from '../../World';

export class ModelFactory2 {
    public meshInfo: [Mesh[], Skeleton[]];
    private scene: Scene;

    constructor(meshInfo: [Mesh[], Skeleton[]], scene: Scene) {
        this.meshInfo = meshInfo;
        this.scene = scene;
    }

    public createItem(meshes: Mesh[], boundingBox: Polygon, rotation: number): WorldItem {
        meshes[0].isVisible = true;

        boundingBox = boundingBox.mirrorY();
        boundingBox = boundingBox.addX(- boundingBox.width / 2);
        boundingBox = boundingBox.addY(boundingBox.height / 2);

        const meshModel = new SimpleWorldItem(meshes[0], boundingBox, {type: meshes[0].name});
        meshModel.setBoudingBox(boundingBox);
        meshModel.rotateY(rotation);

        const mesh = this.createMesh(meshModel, this.scene);
        mesh.checkCollisions = true;
        meshModel.setBoundingMesh(mesh);

        const impostor = new PhysicsImpostor(mesh, PhysicsImpostor.BoxImpostor, { mass: 2, friction: 1, restitution: 0.3 }, this.scene);
        mesh.physicsImpostor = impostor;

        // mesh.setImpostor(impostor);
        (window as any).physicsViewer.showImpostor(mesh.physicsImpostor);

        return meshModel;
    }


    private createMesh(worldItem: WorldItem, scene: Scene): Mesh {
        const boundingPolygon = worldItem.getBoundingBox();

        const box = MeshBuilder.CreateBox(
            `bounding-box`,
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
