import { Map, fromJS } from 'immutable';
import { Observable } from 'rxjs';
import { push } from 'react-router-redux';
import { combineEpics } from 'redux-observable';

import feathersApp from '../../../../../data/feathersApp';

const spGuess = feathersApp.service('spGuess');

// Actions
const CREATE = 'bulls-and-cows/sp/guess/CREATE';
const CREATE_FULFILLED = 'bulls-and-cows/sp/guess/CREATE_FULFILLED';

// Action Creators
export const create = (guess, gameId) => ({ type: CREATE, payload: guess, target: gameId });
export const createFulfilled = rating => ({ type: CREATE_FULFILLED, payload: rating });

// Epic
const createEpic = action$ =>
  action$.ofType(CREATE)
    .mergeMap(({ payload: guess, target: gameId }) =>
      Observable.fromPromise(spGuess.create({ guess }, { query: { gameId } }))
        .map(createFulfilled)
        .catch(error => Observable.of({
          type: 'ERROR',
          payload: error.xhr.response,
          error: true,
        })),
    );

export const epic = combineEpics(
  createEpic,
);

// Reducer
const initialState = fromJS({
  guesses: [],
  ratings: [],
});
const reducer = (state = initialState, action) => {
  switch(action.type) {
    case CREATE:
      return state.update('guesses', guesses => guesses.push(action.payload));
    case CREATE_FULFILLED:
      return state.update('ratings', ratings => ratings.push(Map(action.payload)));
    default:
      return state;
  }
};
export default reducer;
