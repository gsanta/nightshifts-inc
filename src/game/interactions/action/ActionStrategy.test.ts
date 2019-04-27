import { Player } from '../../world/world_items/player/Player';
import { VectorModel } from '../../model/core/VectorModel';
import { WorldItem } from '../../world/world_items/WorldItem';
import { World } from '../../world/World';
import { ActionStrategy } from './ActionStrategy';
import { expect } from 'chai';
import sinon = require('sinon');

describe('ActionStrategy', () => {
    describe('activateClosestMeshAction', () => {
        it('finds the closest actionable mesh and executes the default action on it', () => {
            const player: Partial<Player> = {
                getCenterPosition: () => new VectorModel(0, 0, 0)
            };

            const nonActionableObj: Partial<WorldItem> = {
                hasDefaultAction: false,
            };

            const doDefaultAction = sinon.spy();
            const actionableObj1: Partial<WorldItem> = {
                hasDefaultAction: true,
                getCenterPosition: () => new VectorModel(2, 0, 0),
                doDefaultAction: doDefaultAction
            };

            const actionableObj2: Partial<WorldItem> = {
                hasDefaultAction: true,
                getCenterPosition: () => new VectorModel(3, 0, 0)
            };

            const worldMap: Partial<World> = {
                worldItems: <WorldItem[]> [nonActionableObj, actionableObj1, actionableObj2]
            };

            const actionStrategy = new ActionStrategy(<Player> player, <World> worldMap);

            actionStrategy.activateClosestMeshAction();

            // tslint:disable-next-line:no-unused-expression
            expect(doDefaultAction.calledOnce).to.be.true;
        });
    });
});
