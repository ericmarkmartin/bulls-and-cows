import { connect } from 'react-redux';

import { create } from './services/spGames';
import CreateGame from './CreateGame';

const mapStateToProps = () => ({});
const mapDipsatchToProps = dispatch => ({
  createGame: () => dispatch(create()),
});

const CreateGameContainer = connect(
  mapStateToProps,
  mapDipsatchToProps,
)(CreateGame);

export reducer, { epic } from './services/spGames';
export default CreateGameContainer;
