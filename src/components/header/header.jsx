import React from "react";
import PropTypes from "prop-types";
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {isAdminSelector, usernameSelector} from "#src/js/selectors";
import LogoutLink from "#components/logout-link/logout-link";

const Header = (props) => {
  const {location, username, isAdmin} = props;

  const activeOn = (...triggers) => {
    for (let item of triggers) {
      if (item === location.pathname) {
        return {className: `uk-active`};
      }

      const ind = item.indexOf(`*`);
      if (ind !== -1 && item.substring(0, ind) === location.pathname.substring(0, ind)) {
        return {className: `uk-active`};
      }
    }

    return {};
    // (triggers.includes(location.pathname)) ? {className: `uk-active`} : {}
  };

  return (
    <nav className={`uk-text-uppercase uk-navbar-container`}
         style={{backgroundColor: (isAdmin) ? `#ECEFF1` : `#F5F5F5`}} uk-navbar={``}>
      <div className={`uk-flex uk-navbar-center`}>
        <ul className={`uk-navbar-nav`}>
          <li key={`link-main`} {...activeOn(`/`, `/main`)}><Link to={`/`}>Главная</Link></li>
          <li key={`link-todo`} {...activeOn(`/todos`, `/todo/*`)}><Link to={`/todos`}>Todo List</Link></li>
          {
            (isAdmin)
              ? <li key={`link-users`} {...activeOn(`/users`)}><Link to={`/users`}>Пользователи</Link></li>
              : null
          }
          <li key={`link-profile`} {...activeOn(`/profile`)}><Link to={`/profile`}>{username}</Link></li>
          <li key={`link-logout`}>
            <LogoutLink/>
          </li>
        </ul>
      </div>
    </nav>
  );
};

Header.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  username: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  username: usernameSelector(state),
  isAdmin: isAdminSelector(state)
});

export default withRouter(connect(mapStateToProps)(Header));
