import React from 'react';
import { Route, Link } from 'react-router-dom';

import FlatButton from 'material-ui/FlatButton';
import FlatButtonNavLink from '../../components/FlatButtonNavLink';

const Home = () => (
  <div>
    <FlatButton
      primary
      containerElement={<Link to="/sp" />}
      label="Single-Player"
    />
  </div>
);

export default Home;
