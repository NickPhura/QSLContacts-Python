import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Root from './containers/Root';
import configureStore from './store/configureStore';

// import style from './styles.scss'

const store = configureStore();

render(
  <Provider store={store}>
    <Router>
      <Root />
    </Router>
  </Provider>,
  document.getElementById('root')
);
