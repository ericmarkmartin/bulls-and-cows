import { combineReducers } from 'redux-immutable';
import { combineEpics } from 'redux-observable';

import { reducer as gamesReducer, epic as gamesEpic } from './components/CreateGame';
import { reducer as guessReducer, epic as guessEpic } from './components/Game';

import SinglePlayer from './SinglePlayer';

const reducer = combineReducers({
  games: gamesReducer,
  guess: guessReducer,
});

const epic = combineEpics(
  gamesEpic,
  guessEpic,
);

export { reducer, epic };
export default SinglePlayer;
