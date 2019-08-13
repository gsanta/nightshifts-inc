import { World } from '../src/game/model/game_objects/World';
import { GameObject } from '../src/game/model/game_objects/GameObject';
import { Quaternion, Mesh, Vector3 } from 'babylonjs';


function mockRotationQuaternion(): Quaternion {
    return <Quaternion> {
        x: 0,
        y: 0,
        z: 0,
        w: 1
    }
}

export function mockWorld(): World {

    return <World> {

        worldItems: [
            <GameObject> {
                type: 'player',
                meshes: [
                    <Mesh> {

                    }
                ]
            },
            <GameObject> {
                type: 'portal',
                meshes: [
                    <Mesh> {
                        rotationQuaternion: mockRotationQuaternion(),
                        position: new Vector3(0, 0, 0)
                    }
                ]
            }
        ]
    };
}
