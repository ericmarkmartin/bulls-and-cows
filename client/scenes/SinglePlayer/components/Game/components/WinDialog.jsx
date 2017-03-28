import React, { PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router-dom';

const WinDialog = (props) => {
  const actions = [
    <FlatButton
      primary
      containerElement={<Link to="/sp" />}
      label="New Game"
    />,
  ];

  return (
    <Dialog
      modal
      title="Congratulations, you guessed the correct code!"
      actions={actions}
      open={props.open}
    />
  );
};

WinDialog.propTypes = {
  open: PropTypes.bool.isRequired,
};

export default WinDialog;
