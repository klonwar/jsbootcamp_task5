import React from "react";
import PropTypes from "prop-types";
import {decrypt} from "#src/js/functions.jsx";
import {Link, withRouter} from "react-router-dom";
import OperationCreator from "#src/js/operation-creator";
import {connect} from "react-redux";
import {inf, warn} from "#src/js/logger";
import SpinnerWrapper from "#components/spinner-wrapper/spinner-wrapper";
import {isAdminSelector, isLoginedSelector, roleSelector, usernameSelector} from "#src/js/selectors";

class PureLogoutLink extends React.PureComponent {
  state = {
    submitting: false
  };

  handleClick = async () => {
    this.setState({
      submitting: this.props.isLogined
    });
    this.props.sendLogout();
  };

  render() {
    return (
      <Link to={`#`} className={`uk-position-relative ${(this.state.submitting) ? `uk-disabled` : ``}`}
            onClick={this.handleClick}>
        <SpinnerWrapper loading={this.state.submitting} ratio={`.6`}>
          <span>Выйти</span>
        </SpinnerWrapper>
      </Link>
    );
  }
}

PureLogoutLink.propTypes = {
  sendLogout: PropTypes.func.isRequired,
  isLogined: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  isLogined: isLoginedSelector(state)
});

const mapDispatchToProps = (dispatch) => ({
  sendLogout: () => dispatch(OperationCreator.sendLogout())
});

const LogoutLink = connect(mapStateToProps, mapDispatchToProps)(PureLogoutLink);

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

const mapStateToProps2 = (state) => ({
  username: usernameSelector(state),
  isAdmin: isAdminSelector(state)
});

export default withRouter(connect(mapStateToProps2)(Header));
