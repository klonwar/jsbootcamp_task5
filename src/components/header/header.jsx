import React from "react";
import PropTypes from "prop-types";
import {decrypt} from "#src/js/functions.jsx";
import {Link, withRouter} from "react-router-dom";
import OperationCreator from "#src/js/operation-creator";
import {connect} from "react-redux";
import {warn} from "#src/js/logger";

class PureLogoutLink extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      submitting: false
    };
  }

  handleClick = async () => {
    this.setState({
      submitting: true
    });

    const resp = await this.props.sendLogout();

    if (resp) {
      this.setState({
        submitting: false
      });
    }
  };

  render() {
    return (
      <Link to={`#`} onClick={this.handleClick}
            className={`uk-position-relative ${(this.state.submitting) ? `uk-disabled` : ``}`}>
        <span className={(this.state.submitting) ? `uk-invisible` : ``}>Выйти</span>
        <span className={`uk-position-center ${(this.state.submitting) ? `` : `uk-invisible`}`}
              uk-spinner={`ratio: .6`}/>
      </Link>
    );
  }
}

PureLogoutLink.propTypes = {
  sendLogout: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => ({
  sendLogout: () => dispatch(OperationCreator.sendLogout())
});

const LogoutLink = connect(null, mapDispatchToProps)(PureLogoutLink);

const Header = (props) => {
  const {location} = props;
  const username = decrypt(localStorage.currentUser).username;

  const activeOn = (...triggers) => (triggers.includes(location.pathname)) ? {className: `uk-active`} : {};

  return (
    <nav className={`uk-text-uppercase uk-navbar-container`} uk-navbar={``}>
      <div className={`uk-flex uk-navbar-center`}>
        <ul className={`uk-navbar-nav`}>
          <li key={`link-main`} {...activeOn(`/`, `/main`)}><Link to={`/`}>Главная</Link></li>
          <li key={`link-todo`} {...activeOn(`/todo`)}><Link to={`/todo`}>Todo List</Link></li>
          <li key={`link-profile`} {...activeOn(`/profile`)}><Link to={`/profile`}>{username}</Link></li>
          <li key={`link-logout`}><LogoutLink/></li>
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
