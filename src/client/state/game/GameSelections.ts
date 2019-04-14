import { AppState } from '../app/AppState';


export default class GameSelections {
    public static getGameRequests = (state: AppState) => state.query.game;
    public static getWorld = (state: AppState) => state.world;
    public static getGameActionDispatcher = (state: AppState) => state.gameActionDispatcher;
}
