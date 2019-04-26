import { Room } from './Room';
import { InactiveRoomState } from './InactiveRoomState';
import { World } from '../../World';
import { Light, StandardMaterial } from 'babylonjs';
import { expect } from 'chai';
import { ReservedRoomState } from './ReservedRoomState';
import { ActiveRoomState } from './ActiveRoomState';

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
                state: InactiveRoomState.getInstance(<World> worldMock)
            };

            const activeRoomState = ActiveRoomState.getInstance(<World> worldMock);

            expect(activeRoomState.canRoomTransitionToThis(<Room> roomMock)).to.eq(true);
        });

        it ('returns false if the prev state was `ActiveRoomState` ', () => {
            const roomMock: Partial<Room> = {
                state: ActiveRoomState.getInstance(<World> worldMock)
            };

            const activeRoomState = ActiveRoomState.getInstance(<World> worldMock);

            expect(activeRoomState.canRoomTransitionToThis(<Room> roomMock)).to.eq(false);
        });

        it ('returns false if the prev state was `ReservedRoomState` ', () => {
            const roomMock: Partial<Room> = {
                state: ReservedRoomState.getInstance(<World> worldMock)
            };

            const activeRoomState = ActiveRoomState.getInstance(<World> worldMock);

            expect(activeRoomState.canRoomTransitionToThis(<Room> roomMock)).to.eq(false);
        });
    });
});
