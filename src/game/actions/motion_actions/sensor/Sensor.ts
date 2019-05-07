import { SimpleWorldItem } from '../../../world/world_items/SimpleWorldItem';

export interface Sensor {
    testIsWithinRange(creature: SimpleWorldItem);
    setIsVisible(isVisible: boolean);
}
