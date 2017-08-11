import React from 'react';
import Scanner from './scanner/scanner.component';
import { Provider } from 'react-redux';
import createStore from './store'

const store = createStore();

export default () => (
  <Provider store={store}>
    <Scanner />
  </Provider>
)
