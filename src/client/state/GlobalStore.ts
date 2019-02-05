import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { appReducer } from './appReducer';
import rootSaga from './RootActions';

const sagaMiddleware = createSagaMiddleware();

export const GlobalStore = createStore(
    appReducer,
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

