import React from 'react';
import { Route } from 'react-router-dom';

import CreateGameContainer from './components/CreateGame';
import GameContainer from './components/Game';

const SinglePlayer = () => (
  <div>
    <Route exact path="/sp" component={CreateGameContainer} />
    <Route path="/sp/game/:gameId" component={GameContainer} />
  </div>
);

export default SinglePlayer;
