import { TemplateCreator } from '../templates/TemplateCreator';
import { Vector2Model } from '../../utils/Vector2Model';
import { Scene, SpotLight, ShadowGenerator } from 'babylonjs';
import { MeshFactory } from '../../../io/gwm_world_serializer/deserializer/factories/MeshFactory';
import { AbstractMeshFactory } from './AbstractMeshFactory';

interface MeshMap<V> {
    wall: V;
    door: V;
    player: V;
    cupboard: V;
    table: V;
    floor: V;
    window: V;
    bathtub: V;
    washbasin: V;
    bed: V;
}

export abstract class AbstractMeshFactoryProducer {
    public abstract getFactory<T>(scene: Scene, worldDimensions: Vector2Model, shadowGenerator: ShadowGenerator, spotLight: SpotLight): Promise<AbstractMeshFactory<T>>;
    protected abstract getTemplateProducers(scene: Scene, worldDimensions: Vector2Model): Promise<MeshMap<TemplateCreator>>;
}
