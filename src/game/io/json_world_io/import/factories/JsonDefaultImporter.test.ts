import { MeshTemplate } from '../../../../model/core/templates/MeshTemplate';
import { JsonDefaultImporter } from './JsonDefaultImporter';
import sinon = require('sinon');
import { ShadowGenerator, Vector3 } from 'babylonjs';
import { expect } from 'chai';
import { SerializedMeshModel, MeshModel } from '../../../../model/core/MeshModel';
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

            const translateSpy = sinon.spy();
            const meshModelMock: Partial<MeshModel> = {
                mesh: {
                    scaling: {},
                } as any,
                translate: translateSpy
            };
            const clone = sinon.stub().returns(meshModelMock);
            const meshTemplateMock: Partial<MeshModel> = {
                clone: clone
            };

            const shadowGeneratorMock: Partial<ShadowGenerator> = {
                getShadowMap: () => {
                    return <any> {
                        renderList: []
                    };
                }
            };

            const wallDeserializerFactory = new JsonDefaultImporter(<MeshModel> meshTemplateMock, <ShadowGenerator> shadowGeneratorMock);

            const meshModel = wallDeserializerFactory.createItem(<SerializedMeshModel> serializedMeshModelMock);

            expect(translateSpy.getCall(0).args[0]).to.eql(new VectorModel(1, 2, 3));
            expect(meshModel).to.eql(<MeshModel> meshModelMock);
        });
    });
});
