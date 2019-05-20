import { SimpleMeshCreator } from './SimpleMeshCreator';
import { Scene } from '@babylonjs/core';
import * as sinon from 'sinon';
import { VectorModel } from '../../../model/core/VectorModel';
import { expect } from 'chai';
declare const describe, it;

describe('`SimpleMeshCreator`', () => {
    describe('`createBox`', () => {
        it ('returns with a box', () => {
            const scene: Partial<Scene> = {};
            const result = sinon.spy();
            const createBoxFunc = sinon.stub().returns(result);
            const simpleMeshCreator = new SimpleMeshCreator(<Scene> scene, createBoxFunc);

            const box = simpleMeshCreator.createBox('box', new VectorModel(1, 2, 3));

            const matcher = sinon.match({width: 1, depth: 3, height: 2});
            sinon.assert.calledWith(createBoxFunc, 'box', matcher, scene);

            expect(box).to.eql(result);
        });
    });
});
