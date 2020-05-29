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
import HeaderRoute from "#src/components/header-route/header-route.jsx";
import Users from "#components/users/users";
import TodoList from "#components/todo-list/todo-list";
import {isAdminSelector, isLoginedSelector, serverErrorSelector} from "#src/js/selectors";
import Todo from "#components/todo/todo";

const App = (props) => {
  const {location, isLogined, isAdmin, serverError} = props;
  const currentPath = location.pathname;

  if (serverError) {
    throw new Error(`error!`);
  }

  if (!isLogined && currentPath !== `/login`) {
    return (
      <Redirect to={`/login`}/>
    );
  }

  return (
    <Switch>
      <Route exact path={`/login`}>
        <Login/>
      </Route>

      <HeaderRoute exact path={`/`}>
        <Main/>
      </HeaderRoute>

      <HeaderRoute exact path={[`/todos`, `/todo`]}>
        <TodoList/>
      </HeaderRoute>

      <HeaderRoute exact path={`/todo/:id`}>
        <Todo/>
      </HeaderRoute>

      <HeaderRoute exact path={`/users`}>
        {(isAdmin) ? <Users/> : <Redirect to={`/`}/>}
      </HeaderRoute>

      <Route>
        <Redirect to={`/`}/>
      </Route>
    </Switch>
  );

};

App.propTypes = {
  location: PropTypes.object.isRequired,
  isLogined: PropTypes.bool,
  isAdmin: PropTypes.bool,
  serverError: PropTypes.object
};

const mapStateToProps = (state) => ({
  isLogined: isLoginedSelector(state),
  isAdmin: isAdminSelector(state),
  serverError: serverErrorSelector(state)
});

export default withRouter(connect(mapStateToProps, null)(App));
