import { JsonDefaultImporter } from './JsonDefaultImporter';
import sinon = require('sinon');
import { ShadowGenerator, Vector3 } from 'babylonjs';
import { expect } from 'chai';
import { SerializedMeshModel, WorldItem } from '../../../../world_items/WorldItem';
import { VectorModel } from '../../../../model/core/VectorModel';

describe('JsonDefaultImporter', () => {
    describe('createItem', () => {
        it ('creates the MeshModel based on the given SerializedMeshModel', () => {
            const serializedMeshModelMock: Partial<SerializedMeshModel> = {
                scaling: {
                    x: 2,
                    y: 2,
                    z: 2
                },
                translate: {
                    x: 1, y: 2, z: 3
                }
            };
            const clonedWorldItemMock = {
                mesh: {
                    scaling: {},
                    translate: sinon.spy()
                },
                translate: sinon.spy()
            };
            const cloneStub = sinon.stub().returns([clonedWorldItemMock]);
            const worldItemMock: Partial<WorldItem> = {
                clone: cloneStub
            };

            const shadowGeneratorMock: Partial<ShadowGenerator> = {
                getShadowMap: () => {
                    return <any> {
                        renderList: []
                    };
                }
            };

            const wallDeserializerFactory = new JsonDefaultImporter(<WorldItem> worldItemMock, <ShadowGenerator> shadowGeneratorMock);

            const meshModel = wallDeserializerFactory.createItem(<SerializedMeshModel> serializedMeshModelMock);

            expect(clonedWorldItemMock.translate.getCall(0).args[0]).to.eql(new VectorModel(1, 2, 3));
            expect(meshModel.mesh).to.eql(clonedWorldItemMock.mesh);
        });
    });
});
