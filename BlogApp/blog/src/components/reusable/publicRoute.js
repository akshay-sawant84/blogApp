import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';


const PublicRoute = ({ component: Component, auth, restricted, ...rest }) => (
  // restricted = false meaning public route
  // restricted = true meaning restricted route
  <Route
    {...rest}
    render={props =>
      auth.isAuthenticated === true && restricted
        ? <Redirect to="/" />
        : <Component {...props} />
    }
  />
);

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PublicRoute);