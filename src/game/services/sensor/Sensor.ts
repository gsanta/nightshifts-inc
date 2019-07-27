import { GameObject } from '../../world/world_items/item_types/GameObject';

export interface Sensor {
    testIsWithinRange(creature: GameObject);
    setIsVisible(isVisible: boolean);
}
