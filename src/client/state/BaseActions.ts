import { AppState } from './AppState';


export default class BaseActions {
    public getUserQuery(state: AppState) {
        return state.query.user;
    }
}
