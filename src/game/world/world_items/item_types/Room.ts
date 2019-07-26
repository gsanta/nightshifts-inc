import { SimpleWorldItem } from './SimpleWorldItem';
import { GameObject } from './GameObject';


export class Room extends SimpleWorldItem {
    neighbours: GameObject[];
}
