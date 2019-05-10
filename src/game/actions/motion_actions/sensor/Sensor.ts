import { SimpleWorldItem } from '../../../world/world_items/item_types/SimpleWorldItem';

export interface Sensor {
    testIsWithinRange(creature: SimpleWorldItem);
    setIsVisible(isVisible: boolean);
}
