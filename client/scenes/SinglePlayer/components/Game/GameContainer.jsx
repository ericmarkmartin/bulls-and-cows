import { PropTypes } from 'react';
import { connect } from 'react-redux';

import { create } from './services/spGuess';
import Game from './Game';

const mapStateToProps = state => {
  const guessState = state.getIn(['sp', 'guess']);
  const guesses = guessState.get('guesses');
  const ratings = guessState.get('ratings');
  return {
    guesses,
    ratings,
  };
};
const mapDipsatchToProps = (dispatch, { match: { params: { gameId } } }) => ({
  submitGuess: guess => dispatch(create(guess, gameId)),
});

const GameContainer = connect(
  mapStateToProps,
  mapDipsatchToProps,
)(Game);

GameContainer.propTypes = {
  params: PropTypes.objectOf(PropTypes.string),
};

GameContainer.defaultProps = {
  params: {},
};

export default GameContainer;
