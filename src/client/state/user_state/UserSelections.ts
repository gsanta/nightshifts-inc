import { AppState } from '../app_state/AppState';


export default class UserSelections {
    public static getUserQuery = (state: AppState) => state.query.user;
    public static getUser = (state: AppState) => state.user;
}
