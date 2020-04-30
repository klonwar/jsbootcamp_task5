import React from "react";
import Login from "#components/login/login";
import {log} from "#src/js/logger";
import Main from "#components/main/main";
import PropTypes from "prop-types";

import {
  Switch,
  Route,
  Redirect,
  withRouter,
  Link
} from "react-router-dom";
import Logout from "#components/logout/logout";
import {decrypt} from "#src/js/functions.jsx";
import Wrapper from "#components/wrapper/wrapper";

const App = (props) => {
  const {location} = props;
  const currentPath = location.pathname;

  if (!localStorage.currentUser && currentPath !== `/login`) {
    return (
      <Redirect to={`/login`}/>
    );
  }

  if (localStorage.currentUser && currentPath !== `/logout`) {
    try {
      decrypt(localStorage.currentUser);
    } catch (e) {
      return <Redirect to={`/logout`}/>;
    }
  }

  return (
    <Switch>
      <Route path={`/login`}>
        <Login/>
      </Route>
      <Route path={`/logout`}>
        <Logout/>
      </Route>

      <Route path={`/main`}>
        <Wrapper>
          <Main/>
        </Wrapper>
      </Route>
      <Route exact path={`/`}>
        <Wrapper>
          <Main/>
        </Wrapper>
      </Route>
      <Route path={`/`}>
        <Redirect to={`/`}/>
      </Route>
    </Switch>
  );

};

App.propTypes = {
  location: PropTypes.object.isRequired
};

export default withRouter(App);
