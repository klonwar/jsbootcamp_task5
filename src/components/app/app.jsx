import React from "react";
import Login from "#components/login/login";
import {log} from "#src/js/logger";
import Main from "#components/main/main";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {
  Switch,
  Route,
  Redirect,
  withRouter,
} from "react-router-dom";
import Logout from "#components/logout/logout";
import {decrypt} from "#src/js/functions.jsx";
import HeaderRoute from "#src/header-route/header-route.jsx";

const App = (props) => {
  const {location, isLogined} = props;
  const currentPath = location.pathname;

  if (!isLogined && currentPath !== `/login`) {
    return (
      <Redirect to={`/login`}/>
    );
  }

  return (
    <Switch>
      <Route path={`/login`}>
        <Login/>
      </Route>

      <HeaderRoute exact path={`/`}>
        <Main/>
      </HeaderRoute>

      <Route>
        <Redirect to={`/`}/>
      </Route>
    </Switch>
  );

};

App.propTypes = {
  location: PropTypes.object.isRequired,
  isLogined: PropTypes.bool
};

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  isLogined: state.isLogined
});

export default withRouter(connect(mapStateToProps, null)(App));
