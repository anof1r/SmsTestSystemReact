import { configureStore } from '@reduxjs/toolkit';

import rootReducer from './reducers';

export default function store(preloadedState) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}
