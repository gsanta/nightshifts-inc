import { mockWorld, mockRayCaster } from '../../testUtils';
import { PortalTool } from '../../../src/game/tools/PortalTool';
import { Vector3, Quaternion } from 'babylonjs';
import { World } from '../../../src/game/model/game_objects/World';
import { Point } from '@nightshifts.inc/geometry';
import * as sinon from 'sinon';

describe('PortalTool', () => {
    let world: World;

    beforeEach(() => {
        const strWorld = `
        map \`

        WWWWWWWWWWWWWWWWWWWWWWWWW
        W###############W#######W
        W#####DD########W#######W
        W###############W#######W
        W###############W#######W
        WWWWWWWWWWWWWWWWWWWWWWWWW
        W###############W#######W
        W###############W#######W
        W###############W#######W
        W###############W#######W
        WWWWWWWWWWWWWWWWWWWWWWWWW

        \`

        definitions \`

        W = wall
        # = empty
        X = player
        D = portal
        C = cupboard
        I = window
        T = table
        B = bathtub
        S = washbasin
        E = bed
        H = chair

        \`
    `;

        world = mockWorld(strWorld)[0];
    });

    describe('update', () => {
        it ('updates the position of the Portal if a valid mesh for Portal placement was found', () => {
            const walls = world.getWorldItemsByType('wall');

            const hitStub = sinon.stub()
                .onFirstCall()
                .returns([walls[0], walls[0].boundingBox.getBoundingCenter()])
                .onSecondCall()
                .returns([walls[1], walls[1].boundingBox.getBoundingCenter()]);

            const rayCaster = mockRayCaster(hitStub);

            const portalTool = new PortalTool(world, rayCaster);
            const portal = world.getWorldItemsByType('portal')[0];

            portalTool.update();

            expect(portal.meshes[0].position).toEqual(new Vector3(walls[0].boundingBox.getBoundingCenter().x, 0, walls[0].boundingBox.getBoundingCenter().y));
            expect(portal.meshes[0].rotationQuaternion).toEqual(walls[0].meshes[0].rotationQuaternion);
            expect(portal.boundingBox.getBoundingCenter()).toEqual(walls[0].boundingBox.getBoundingCenter());

            portalTool.update();

            expect(portal.meshes[0].position).toEqual(new Vector3(walls[1].boundingBox.getBoundingCenter().x, 0, walls[1].boundingBox.getBoundingCenter().y));
            expect(portal.meshes[0].rotationQuaternion).toEqual(walls[1].meshes[0].rotationQuaternion);
            expect(portal.boundingBox.getBoundingCenter()).toEqual(walls[1].boundingBox.getBoundingCenter());
        });

        it ('does not modify the Portal\'s position if no hits were found for Portal placement', () => {
            const rayCaster = mockRayCaster(() => [null, null]);

            const portalTool = new PortalTool(world, rayCaster);
            const portal = world.getWorldItemsByType('portal')[0];

            expect(portal.meshes[0].position).toEqual(new Vector3(7, 0, 5));
            expect(portal.meshes[0].rotationQuaternion).toEqual(new Quaternion(0, 0, 0, 1));
            expect(portal.boundingBox.getBoundingCenter()).toEqual(new Point(7, 5));

            portalTool.update();

            expect(portal.meshes[0].position).toEqual(new Vector3(7, 0, 5));
            expect(portal.meshes[0].rotationQuaternion).toEqual(new Quaternion(0, 0, 0, 1));
            expect(portal.boundingBox.getBoundingCenter()).toEqual(new Point(7, 5));
        });
    });
});
