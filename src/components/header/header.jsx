import React from "react";
import PropTypes from "prop-types";
import {decrypt, logout} from "#src/js/functions.jsx";
import {Link, withRouter} from "react-router-dom";

const Header = (props) => {
  const {location, history} = props;
  const username = decrypt(localStorage.currentUser).username;

  const activeOn = (...triggers) => (triggers.includes(location.pathname)) ? {className: `uk-active`} : {};

  return (
    <nav className={`uk-text-uppercase uk-navbar-container`} uk-navbar={``}>
      <div className={`uk-flex uk-navbar-center`}>
        <ul className={`uk-navbar-nav`}>
          <li key={`link-main`} {...activeOn(`/`, `/main`)}><Link to={`/`}>Главная</Link></li>
          <li key={`link-todo`} {...activeOn(`/todo`)}><Link to={`/todo`}>Todo List</Link></li>
          <li key={`link-profile`} {...activeOn(`/profile`)}><Link to={`/profile`}>{username}</Link></li>
          <li key={`link-logout`}><Link to={`#`} onClick={async () => await logout(history)}>Выйти</Link></li>
        </ul>
      </div>

    </nav>
  );
};

Header.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(Header);
