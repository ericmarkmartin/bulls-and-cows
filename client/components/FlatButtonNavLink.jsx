import React, { PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import { Route, Link } from 'react-router-dom';

const FlatButtonNavLink = ({ label, to, activeOnlyWhenExact, disabled }) => (
  <Route
    path={to} exact={activeOnlyWhenExact}
    children={({ match }) => ( // eslint-disable-line react/no-children-prop
      <Link to={to}>
        <FlatButton
          primary={!match}
          secondary={!!match}
          disabled={disabled}
          label={label}
        />
      </Link>
    )}
  />
);

FlatButtonNavLink.propTypes = {
  label: PropTypes.string,
  to: PropTypes.string.isRequired,
  activeOnlyWhenExact: PropTypes.bool,
  disabled: PropTypes.bool,
};

FlatButtonNavLink.defaultProps = {
  label: '',
  activeOnlyWhenExact: false,
  disabled: false,
};

export default FlatButtonNavLink;
