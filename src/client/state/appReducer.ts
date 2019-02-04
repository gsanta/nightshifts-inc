import { AppState } from './AppState';

const initialState: AppState = {
    world: null
};

export interface Action {
    type: string;
}

export const appReducer = (state: AppState = initialState, action: Action) => {
    return state;
};
