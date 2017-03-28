import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const CreateGame = props => (
  <RaisedButton
    primary
    label="Create Game"
    onTouchTap={props.createGame}
  />
);

CreateGame.propTypes = {
  createGame: PropTypes.func.isRequired,
};

export default CreateGame;
