import { createStore } from 'redux';
import { appReducer } from './appReducer';

export const GlobalStore = createStore(appReducer);
