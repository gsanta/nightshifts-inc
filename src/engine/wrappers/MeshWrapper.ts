import { VectorModel } from '../../game/model/core/VectorModel';


export interface MeshWrapper<M> {
    wrappedMesh: M;

    getXExtent(): number;
    getYExtent(): number;
    getZExtent(): number;

    translate(vectorModel: VectorModel);
    intersectsPoint(vector: VectorModel);
    getPosition(): VectorModel;

    rotateAtCenter(vectorModel: VectorModel, amount: number): void;
    getRotation(): VectorModel;

    getScale(): VectorModel;
    setScale(vectorModel: Partial<VectorModel>);

    clone(name: string): MeshWrapper<M>;
    getId(): string;
}
