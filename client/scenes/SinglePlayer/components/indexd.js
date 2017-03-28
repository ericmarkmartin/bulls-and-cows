import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';

import { reducer as gamesReducer, epic as gamesEpic } from './CreateGame';
import { reducer as guessReducer, epic as guessEpic } from './Game';

const reducer = combineReducers({
  games: gamesReducer,
  guess: guessReducer,
});

const epic = combineEpics(
  gamesEpic,
  guessEpic,
);

export { reducer, epic };
