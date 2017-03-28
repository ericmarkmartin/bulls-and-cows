import { Map } from 'immutable';
import { Observable } from 'rxjs';
import { push } from 'react-router-redux';
import { combineEpics } from 'redux-observable';

import feathersApp from '../../../../../data/feathersApp';

const spGames = feathersApp.service('spGames');

// Actions
const CREATE = 'bulls-and-cows/sp/game/CREATE';
const CREATE_FULFILLED = 'bulls-and-cows/sp/game/CREATE_FULFILLED';

// Action Creators
export const create = () => ({ type: CREATE });
export const createFulfilled = gameId => ({ type: CREATE_FULFILLED, payload: gameId });

// Epics
const createEpic = action$ =>
  action$.ofType(CREATE)
    .mergeMap(() =>
      Observable.fromPromise(spGames.create({}))
        .map(({ _id: gameId }) => createFulfilled(gameId))
        .catch(error => Observable.of({
          type: 'ERROR',
          payload: error.xhr.response,
          error: true,
        })),
    );

const createFulfilledEpic = action$ =>
  action$.ofType(CREATE_FULFILLED)
    .map(({ payload: gameId }) => push(`/sp/game/${gameId}`));

export const epic = combineEpics(
  createEpic,
  createFulfilledEpic,
);

// Reducer
const initialState = Map({
  gameId: undefined,
});
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_FULFILLED:
      return state.set('gameId', action.payload);
    default:
      return state;
  }
};
export default reducer;
