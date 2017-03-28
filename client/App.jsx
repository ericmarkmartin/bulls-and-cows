import React from 'react';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import store, { history } from './data/store';

import './App.styl';

import Home from './scenes/Home';
import SinglePlayer from './scenes/SinglePlayer';

const Main = () => (
  <ConnectedRouter history={history}>
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/sp" component={SinglePlayer} />
    </div>
  </ConnectedRouter>
);

const App = () => (
  <Provider store={store}>
    <MuiThemeProvider>
      <Main />
    </MuiThemeProvider>
  </Provider>
);

export default App;
