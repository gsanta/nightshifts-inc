import { Scene } from 'babylonjs/scene';
import { RayHelper, Vector3, PickingInfo, Ray, Mesh } from 'babylonjs';
import { BabylonFactory } from './BabylonFactory';
import { GameObject } from '../game_objects/GameObject';
import { VectorUtils } from './VectorUtils';
import { World } from '../game_objects/World';
import { Line, Segment, Point } from '@nightshifts.inc/geometry';

export interface HitInfo {
    pickedGameObject: GameObject;
    intersectionPoint: Point;
}

export class RayCaster {
    private world: World;
    private prevRayCast: RayHelper;
    private babylonFactory: typeof BabylonFactory;
    private vectorUtils: typeof VectorUtils;

    constructor(world: World, vectorUtils: typeof VectorUtils = VectorUtils, babylonFactory: typeof BabylonFactory = BabylonFactory) {
        this.world = world;
        this.vectorUtils = vectorUtils;
        this.babylonFactory = babylonFactory;
    }

    castRay(gameObject: GameObject, direction: Vector3): HitInfo {
        const origin = gameObject.meshes[0].position;

        direction = this.vectorUtils.globalToLocalVector(direction, gameObject.meshes[0]);
        direction = direction.subtract(<any> origin);
        direction = Vector3.Normalize(direction);

        let length = 100;

        let ray = new this.babylonFactory.Ray(origin, direction, length);

        let pickingInfo = this.world.scene.pickWithRay(ray);
        const pickedGameObject = this.findPickedGameObject(pickingInfo);
        let intersectionPoint = null;

        if (pickingInfo.hit && this.world.getGameObjectForMesh(<Mesh> pickingInfo.pickedMesh)) {
            intersectionPoint = this.getIntersectionPoint(ray, this.world.getGameObjectForMesh(<Mesh> pickingInfo.pickedMesh));
        }

        if (this.prevRayCast) {
            this.prevRayCast.dispose();
        }

        this.prevRayCast =  this.babylonFactory.RayHelper.CreateAndShow(ray, this.world.scene, new BABYLON.Color3(1, 1, 0.1));

        return {
            pickedGameObject,
            intersectionPoint
        };
    }

    private findPickedGameObject(pickingInfo: PickingInfo) {
        if (pickingInfo.hit) {
            const gameObject = this.world.getGameObjectForMesh(<Mesh> pickingInfo.pickedMesh);
            return gameObject;
        }
    }

    private getIntersectionPoint(ray: Ray, pickedGameObject: GameObject): Point {
        const sides = pickedGameObject.boundingBox.getEdges();

        let distance = Number.MAX_VALUE;
        let intersetionPoint: Point = null;
        const point1 = this.vectorUtils.vectorToPoint(ray.origin);
        const point2 = this.vectorUtils.vectorToPoint(ray.direction.add(ray.origin));

        const line = Line.fromTwoPoints(point1, point2);
        const points = line.getSegmentWithCenterPointAndDistance(point1, 100);
        const segment = new Segment(points[0], points[1]);

        for (let i = 0; i < sides.length; i++) {
            const intersection = segment.intersection(sides[i]);
            if (intersection) {
                const dist = point1.distanceTo(intersection);
                if (dist < distance) {
                    intersetionPoint = intersection;
                    distance = dist;
                }
                // console.log('intersection! ' + intersection);
            }
        }

        return intersetionPoint;
        // for (let i = 0; i < sides.length; i++) {
        //     const vector1 = this.vectorUtils.pointToVector(sides[i].getPoints()[0]);
        //     const vector2 = this.vectorUtils.pointToVector(sides[i].getPoints()[1]);
        //     const dist = ray.intersectionSegment(vector1, vector2, 5)
        //     if (dist !== -1) {
        //         console.log('intersection! ' + dist);
        //     }
        // }
        // const rayLine = Line.fromTwoPoints(origin.boundingBox.getBoundingCenter(), pickedGameObject.)
    }
}
