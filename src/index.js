import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import routes from './routes';
import reducer from './reducers/root';

ReactDOM.render(
  <Provider store={ createStore(reducer) }>
    <Router history={ browserHistory } routes={ routes } />
  </Provider>,
  document.getElementById('root')
);
