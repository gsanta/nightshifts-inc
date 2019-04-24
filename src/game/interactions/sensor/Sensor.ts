import { Creature } from '../../model/world_items/Creature';

export interface Sensor {
    testIsWithinRange(creature: Creature);
    setIsVisible(isVisible: boolean);
}
