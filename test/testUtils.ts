import { Point, Polygon } from '@nightshifts.inc/geometry';
import { BabylonConverter, parsers, transformators, WorldItemInfo, WorldItemInfoFactory, WorldParser } from '@nightshifts.inc/world-generator';
import { Mesh, Quaternion, Ray, RayHelper, Scene, Vector3 } from 'babylonjs';
import * as sinon from 'sinon';
import { GameObjectFactory } from '../src/game/import/GameObjectFactory';
import { Border } from '../src/game/model/game_objects/Border';
import { GameObject } from '../src/game/model/game_objects/GameObject';
import { Room } from '../src/game/model/game_objects/Room';
import { World } from '../src/game/model/game_objects/World';
import { BabylonFactory } from '../src/game/model/utils/BabylonFactory';
import { HitInfo, RayCaster } from '../src/game/model/utils/RayCaster';
import { VectorUtils } from '../src/game/model/utils/VectorUtils';

const defaultStrWorld = `
map \`

WWWWWWWWWWWWWWWWWWWWWWWWW
W###############W#######W
W#####DD########W#######W
W###############W#######W
W###############W#######W
WWWWWWWWWWWWWWWWWWWWWWWWW
W###############W#######W
W###############W#######W
W###############W#######W
W###############W#######W
WWWWWWWWWWWWWWWWWWWWWWWWW

\`

definitions \`

W = wall
# = empty
X = player
D = portal
C = cupboard
I = window
T = table
B = bathtub
S = washbasin
E = bed
H = chair

\`
`;

export class SceneStubs {
    static pickWithRay: sinon.SinonStub;
}

export function mockScene(): [Scene, typeof SceneStubs] {
    const pickWithRay = sinon.stub().returns({hit: true});

    return [
        <Scene> {
            pickWithRay: (ray: Ray) => <any> pickWithRay(ray)
        },
        <typeof SceneStubs> {
            pickWithRay
        }
    ];
}

export class WorldStubs {
    scene: typeof SceneStubs;
}

export function mockWorld(strWorld = defaultStrWorld): [World, WorldStubs] {
    const options = { xScale: 1, yScale: 2};
    const furnitureCharacters = ['player', 'cupboard', 'table', 'bathtub', 'washbasin', 'bed', 'chair', 'portal'];
    const roomSeparatorCharacters = ['wall', 'door', 'window'];

    const worldItemInfoFactory = new WorldItemInfoFactory();
    const worldItems = WorldParser.createWithCustomWorldItemGenerator(
        new parsers.CombinedWorldItemParser(
            [
                new parsers.FurnitureInfoParser(worldItemInfoFactory, furnitureCharacters),
                new parsers.RoomSeparatorParser(worldItemInfoFactory, roomSeparatorCharacters),
                new parsers.RoomInfoParser(worldItemInfoFactory),
                new parsers.PolygonAreaInfoParser(worldItemInfoFactory, 'empty', 'W'),
                new parsers.RootWorldItemParser(worldItemInfoFactory)
            ]
        ),
        [

            new transformators.ScalingTransformator({ x: options.xScale, y: options.yScale }),
            new transformators.BorderItemSegmentingTransformator(worldItemInfoFactory, ['wall', 'door', 'window'], { xScale: options.xScale, yScale: options.yScale }),
            new transformators.HierarchyBuildingTransformator(),
            new transformators.BorderItemAddingTransformator(['wall', 'door', 'window']),
            new transformators.BorderItemsToLinesTransformator(),
            new transformators.BorderItemWidthToRealWidthTransformator([{name: 'window', width: 2}, {name: 'door', width: 2.7}]),
            new transformators.FurnitureRealSizeTransformator(
                {
                    cupboard: Polygon.createRectangle(0, 0, 2, 1.5),
                    bathtub: Polygon.createRectangle(0, 0, 4.199999999999999, 2.400004970948398),
                    washbasin: Polygon.createRectangle(0, 0, 2, 1.58 + 1.5),
                    table: Polygon.createRectangle(0, 0, 3.4, 1.4 + 1.5)

                }
            ),
            new transformators.MockMeshCreationTransformator<any>((worldItem: WorldItemInfo) => {
                const mesh = <Mesh> {
                    getBoundingInfo() {
                        return {
                            boundingSphere: {
                                centerWorld: mesh.position
                            }
                        };
                    },
                    setAbsolutePosition(vector: Vector3) {
                        this.position = vector;
                    },
                    position: VectorUtils.pointToVector(worldItem.dimensions.getBoundingCenter()),
                    getAbsolutePosition: () => VectorUtils.pointToVector(worldItem.dimensions.getBoundingCenter()),
                    rotationQuaternion: new Quaternion(0, worldItem.rotation, 0, 1)
                };

                return [mesh];
            })
        ]
    ).parse(strWorld);

    const gameObjects: GameObject[] = [];

    const gameObjectFactory = new GameObjectFactory();
    new BabylonConverter<GameObject>().convert(
        worldItems,
        (worldItemInfo: WorldItemInfo) => {
            const gameObject = gameObjectFactory.getInstance(worldItemInfo);
            gameObjects.push(gameObject);
            return gameObject;
        },
        (parent: GameObject, children: GameObject[]) => {
            parent.children = children;
        },
        (item: GameObject, borders: GameObject[]) => {
            (<Room> item).borders = <Border[]> borders;
        });


    const worldStubs = <WorldStubs> {};

    const world = new World();
    world.worldItems = gameObjects;

    const [scene, sceneStubs] = mockScene();
    world.scene = scene;
    worldStubs.scene = sceneStubs;

    return [world, worldStubs];
}

export function mockRayCaster(getHit: (gameObject: GameObject, direction: Vector3) => [GameObject, Point]): RayCaster {
    return <RayCaster> {
        castRay(gameObject: GameObject, direction: Vector3) {
            const [pickedGameObject, intersectionPoint] = getHit(gameObject, direction);

            return <HitInfo> {
                pickedGameObject,
                intersectionPoint
            };
        }
    };
}

export function mockVectorUtils(): typeof VectorUtils {
    sinon.stub(VectorUtils, 'localNormalDirection').callsFake((vector: Vector3, mesh: Mesh) => vector);

    return VectorUtils;
}

export function mockBabylonFactory(): typeof BabylonFactory {
    sinon.stub(BabylonFactory, 'Ray').callsFake((origin: Vector3, direction: Vector3, length: number) => ({origin, direction, length}));
    sinon.stub(BabylonFactory.RayHelper, 'CreateAndShow').returns(<RayHelper> {
            dispose: <any> sinon.stub()
    })

    return BabylonFactory;
}
