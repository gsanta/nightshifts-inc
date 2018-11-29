import { ActionType } from '../ActionType';

export interface AppModel {
    appState: 'loading' | 'ready';
    dataLoadingState: 'loading' | 'recently_loaded' | 'loaded';
    lastActiontType: ActionType;
}
