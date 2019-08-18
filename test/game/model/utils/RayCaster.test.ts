import { PickingInfo, Vector3 } from 'babylonjs';
import { GameObject } from '../../../../src/game/model/game_objects/GameObject';
import { RayCaster } from '../../../../src/game/model/utils/RayCaster';
import { mockBabylonFactory, mockScene, mockVectorUtils, mockWorld } from '../../../testUtils';
import { World } from '../../../../src/game/model/game_objects/World';
import { Point } from '@nightshifts.inc/geometry';

describe(`RayCaster`, () => {
    describe(`castRay`, () => {
        it ('shoots a ray from the given entity to the given direction', () => {
            const [world, worldStubs] = mockWorld();
            worldStubs.scene.pickWithRay.returns({hit: true, pickedMesh: world.getWorldItemsByType('wall')[0].meshes[0]});
            const vectorUtils = mockVectorUtils();
            const babylonFatory = mockBabylonFactory();

            const gameObject = <GameObject> {
                meshes: [
                    {
                        position: new Vector3(5, 0, 15)
                    }
                ]
            };

            const rayCaster = new RayCaster(world, vectorUtils, babylonFatory);

            const hitInfo = rayCaster.castRay(gameObject, new Vector3(-1, 0, 0));

            expect(hitInfo).toEqual({pickedGameObject: world.getWorldItemsByType('wall')[0], intersectionPoint: new Point(0.5, 15)});
        });
    });
});
