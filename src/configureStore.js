import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { queryMiddleware } from 'redux-query';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import superagentInterface from 'redux-query-interface-superagent';

import {
  requestFailureMiddleware,
  requestSuccessMiddleware,
} from './middlewares';
import rootReducer from './reducers';

export const getQueries = state => state.queries;
export const getEntities = state => state.entities;

export default function configureStore(preloadedState) {
  let middlewares = [
    requestFailureMiddleware,
    requestSuccessMiddleware,
    thunkMiddleware,
    queryMiddleware(superagentInterface, getQueries, getEntities),
  ];

  if (process.env.NODE_ENV !== 'production') {
    middlewares = [...middlewares, createLogger()];
  }

  middlewares = applyMiddleware(...middlewares);

  const composedEnhancers = composeWithDevTools(middlewares);

  return createStore(rootReducer, preloadedState, composedEnhancers);
}
