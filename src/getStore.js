import {
  createStore,
  applyMiddleware,
  compose,
} from 'redux';

import { createLogger } from 'redux-logger';
import { Iterable } from 'immutable';
import thunk from 'redux-thunk';
import createSagaMiddleWare from 'redux-saga';

import { getQuery } from './utility';
import { reducer } from './combineReducers';
import { defaultState } from './defaultState';
import { initSagas } from './initSagas';

const stateTransformer = (state) => {
  if (Iterable.isIterable(state)) return state.toJS();
  return state;
};

const logger = createLogger({
  stateTransformer,
});

export const getStore = () => {
  const sagaMiddleWare = createSagaMiddleWare();
  const middleWares = [sagaMiddleWare, thunk];
  if (getQuery().logger) { middleWares.push(logger); }
  const composables = [applyMiddleware(...middleWares)];
  const enhancer = compose(...composables);
  const store = createStore(
    reducer,
    defaultState,
    enhancer,
  );
  console.info('Saga Middleware implemented.');
  initSagas(sagaMiddleWare);
  return store;
};
