import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { Provider as ReduxQueryProvider } from 'redux-query-react';

import App from './App';
import configureStore from './configureStore';

const getQueries = state => state.queries;

const store = configureStore();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <ReduxQueryProvider queriesSelector={getQueries}>
      <App />
    </ReduxQueryProvider>
  </Provider>,
);
