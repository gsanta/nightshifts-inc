import { AppState } from '../root/RootState';


export default class GameSelections {
    public static getGameRequests = (state: AppState) => state.query.game;
    public static getWorld = (state: AppState) => state.world;
}
