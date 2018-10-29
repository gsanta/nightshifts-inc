import { Creature } from '../creature/Creature';

export interface Sensor {
    testIsWithinRange(creature: Creature);
}