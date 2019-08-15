import { PickingInfo, Vector3 } from 'babylonjs';
import { GameObject } from '../../../../src/game/model/game_objects/GameObject';
import { RayCaster } from '../../../../src/game/model/utils/RayCaster';
import { mockBabylonFactory, mockScene, mockVectorUtils } from '../../../testUtils';

describe(`RayCaster`, () => {
    describe(`castRay`, () => {
        it ('shoots a ray from the given entity to the given direction', () => {
            const [scene, sceneStubs] = mockScene();
            const vectorUtils = mockVectorUtils();
            const babylonFatory = mockBabylonFactory();

            const gameObject = <GameObject> {
                meshes: [
                    {
                        position: new Vector3(0, 5, 0)
                    }
                ]
            }

            const rayCaster = new RayCaster(scene, vectorUtils, babylonFatory);

            const hit = rayCaster.castRay(gameObject, new Vector3(0, 1, 0));

            expect(sceneStubs.pickWithRay.getCall(0).args[0]).toEqual( {origin: new Vector3(0, 5, 0), direction: new Vector3(0, -1, 0), length: 100});
            expect(hit).toEqual(<PickingInfo> {hit: true});

            rayCaster.castRay(gameObject, new Vector3(0, -1, 0));

            expect(sceneStubs.pickWithRay.getCall(1).args[0]).toEqual( {origin: new Vector3(0, 5, 0), direction: new Vector3(0, 1, 0), length: 100});
            expect(hit).toEqual(<PickingInfo> {hit: true});
        });
    });
});
