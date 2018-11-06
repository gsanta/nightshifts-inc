import { Creature } from '../type/Creature';

export interface Sensor {
    testIsWithinRange(creature: Creature);
    setIsVisible(isVisible: boolean);
}
