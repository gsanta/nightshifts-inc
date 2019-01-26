import { DeserializerFactory } from './DeserializerFactory';
import sinon = require('sinon');
import { ItemDeserializer } from './ItemDeserializer';
import { MeshModel, SerializedMeshModel } from '../../../model/core/MeshModel';
import { expect } from 'chai';


describe('DeserializerFactory', () => {
    describe('deserialize', () => {
        it ('creates a WorldMap based on the serialized MeshModels', () => {
            const serializedMeshModels: SerializedMeshModel[] =
            [
                {
                    constructorName: 'wall',
                    translate: {
                        x: 1, y: 2, z: 3
                    }
                },
                {
                    constructorName: 'floor',
                    translate: {
                        x: 1, y: 2, z: 3
                    }
                }
            ];

            const meshModel1 = new MeshModel(null);
            const meshModel2 = new MeshModel(null);

            const createItemStub = sinon.stub()
                .withArgs(serializedMeshModels[0])
                .returns(meshModel1)
                .withArgs(serializedMeshModels[1])
                .returns(meshModel2);

            const defaultSerializer: Partial<ItemDeserializer> = {
                createItem: createItemStub
            };


            const deserializerFactory = new DeserializerFactory(<ItemDeserializer> defaultSerializer);

            const worldMap = deserializerFactory.deserialize(serializedMeshModels);

            expect(worldMap.gameObjects).to.eql([meshModel1, meshModel2]);
        });
    });
});
