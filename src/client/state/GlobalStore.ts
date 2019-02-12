import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { appReducer } from './appReducer';
import rootSaga from './RootActions';
import { LoadUserActions } from './user/LoadUserActions';

const sagaMiddleware = createSagaMiddleware();

export const GlobalStore = createStore(
    appReducer,
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

GlobalStore.dispatch(LoadUserActions.request());

