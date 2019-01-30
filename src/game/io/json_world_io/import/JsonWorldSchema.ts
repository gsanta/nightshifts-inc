import { SerializedMeshModel } from '../../../model/core/MeshModel';

export interface JsonWorldSchema {
    dimensions: {
        x: number;
        y: number;
    };
    items: SerializedMeshModel[];
}

export const setDefaultsForJsonWorld = (jsonWorld: JsonWorldSchema): void => {

    jsonWorld.items.forEach(item => {
        item.scaling = item.scaling ? item.scaling : 1;
    });
};
