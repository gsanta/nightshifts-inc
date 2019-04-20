import { Room } from '../Room';
import { InactiveRoomState } from './InactiveRoomState';
import { World } from '../../../game/model/World';
import { Light, StandardMaterial } from 'babylonjs';
import { ActiveRoomLightingActionHandler } from '../../../game/actions/handlers/ActiveRoomLightingActionHandler';
import { ActiveRoomState } from './ActiveRoomState';
import { expect } from 'chai';
import { ReservedRoomState } from './ReservedRoomState';

describe('ActiveRoomState', () => {
    describe('`canRoomTransitionToThis`', () => {
        let worldMock: Partial<World>;

        beforeEach(() => {
            worldMock = {
                hemisphericLight: <Light> {},
                materials: {
                    doorMaterial: <StandardMaterial> {}
                }
            };
        });

        it ('returns true if the prev state was `InactiveRoomState` ', () => {
            const roomMock: Partial<Room> = {
                state: new InactiveRoomState(<World> worldMock)
            };

            const activeRoomState = new ActiveRoomState(<World> worldMock);

            expect(activeRoomState.canRoomTransitionToThis(<Room> roomMock)).to.eq(true);
        });

        it ('returns false if the prev state was `ActiveRoomState` ', () => {
            const roomMock: Partial<Room> = {
                state: new ActiveRoomState(<World> worldMock)
            };

            const activeRoomState = new ActiveRoomState(<World> worldMock);

            expect(activeRoomState.canRoomTransitionToThis(<Room> roomMock)).to.eq(false);
        });

        it ('returns false if the prev state was `ReservedRoomState` ', () => {
            const roomMock: Partial<Room> = {
                state: new ReservedRoomState(<World> worldMock)
            };

            const activeRoomState = new ActiveRoomState(<World> worldMock);

            expect(activeRoomState.canRoomTransitionToThis(<Room> roomMock)).to.eq(false);
        });
    });
});
