import { BoundingBoxCreator } from '../world_items/factories/BoundingBoxCreator';
import { MeshFactory } from '../world_items/factories/MeshFactory';
import { WorldItem } from '../world_items/item_types/WorldItem';
import { Polygon, Rectangle } from '@nightshifts.inc/geometry';
import { SimpleWorldItem } from '../world_items/item_types/SimpleWorldItem';
import { MeshPhysicsCreator } from '../world_items/factories/MeshPhysicsCreator';

export class ModelFactory {
    private boundingBoxCreator: BoundingBoxCreator;
    private meshFactory: MeshFactory;
    private meshPhysicsCreator: MeshPhysicsCreator;

    constructor(boundingBoxCreator: BoundingBoxCreator, meshFactory: MeshFactory, meshPhysicsCreator: MeshPhysicsCreator) {
        this.boundingBoxCreator = boundingBoxCreator;
        this.meshFactory = meshFactory;
        this.meshPhysicsCreator = meshPhysicsCreator;
    }

    public createItem(boundingBox: Polygon, rotation: number): WorldItem {
        boundingBox = boundingBox.mirrorY();
        boundingBox = boundingBox.addX(- boundingBox.width / 2);
        boundingBox = boundingBox.addY(boundingBox.height / 2);

        const [meshes, skeletons] = this.meshFactory.createMesh();

        const worldItem = new SimpleWorldItem(meshes[0], boundingBox, {type: meshes[0].name});
        worldItem.setBoudingBox(boundingBox);
        worldItem.rotateY(rotation);

        const boundingMesh = this.boundingBoxCreator.createMesh(<Rectangle> boundingBox, worldItem.getHeight(), '#00FF00');
        boundingMesh.checkCollisions = true;
        boundingMesh.isVisible = false;
        worldItem.setBoundingMesh(boundingMesh);

        this.meshPhysicsCreator.create(boundingMesh);

        return worldItem;
    }
}
