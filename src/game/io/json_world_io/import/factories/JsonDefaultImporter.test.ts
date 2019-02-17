import { MeshTemplate } from '../../../../model/core/templates/MeshTemplate';
import { JsonDefaultImporter } from './JsonDefaultImporter';
import sinon = require('sinon');
import { ShadowGenerator, Vector3 } from 'babylonjs';
import { expect } from 'chai';
import { SerializedMeshModel } from '../../../../model/core/MeshModel';

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
            const meshMock = {
                scaling: {},
                translate: sinon.spy()
            };
            const createMeshesStub = sinon.stub().returns([meshMock]);
            const meshTemplateMock: Partial<MeshTemplate> = {
                createMeshes: createMeshesStub
            };

            const shadowGeneratorMock: Partial<ShadowGenerator> = {
                getShadowMap: () => {
                    return <any> {
                        renderList: []
                    };
                }
            };

            const wallDeserializerFactory = new JsonDefaultImporter(<MeshTemplate> meshTemplateMock, <ShadowGenerator> shadowGeneratorMock);

            const meshModel = wallDeserializerFactory.createItem(<SerializedMeshModel> serializedMeshModelMock);

            expect(meshMock.translate.getCall(0).args[0]).to.eql(new Vector3(1, 2, 3));
            expect(meshModel.mesh).to.eql(meshMock);
        });
    });
});
