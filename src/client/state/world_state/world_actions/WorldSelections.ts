import { AppState } from '../../app_state/AppState';


export default class WorldSelections {
    public static getGameRequests: any = (state: AppState) => state.query.game;
    public static getWorld = (state: AppState) => state.world;
    public static getServices = (state: AppState) => state.services;
}
