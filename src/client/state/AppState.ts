import { AppState } from '../gui/App';
import { World } from '../../game/model/World';


export interface AppState {
    world: World;
}
