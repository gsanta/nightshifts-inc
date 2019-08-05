import { GameObject } from '../../model/game_objects/GameObject';

export interface Sensor {
    testIsWithinRange(creature: GameObject);
    setIsVisible(isVisible: boolean);
}
