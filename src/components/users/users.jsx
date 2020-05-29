import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import OperationCreator from "#src/js/operation-creator";
import ActionCreator from "#src/js/action-creator";
import {log} from "#src/js/logger";
import SpinnerWrapper from "#components/spinner-wrapper/spinner-wrapper";
import {usersListSelector} from "#src/js/selectors";

class Users extends React.PureComponent {
  componentDidMount() {
    this.props.getUsersList();
  }

  render() {
    return (
      <SpinnerWrapper className={`uk-width-1-1 uk-flex uk-flex-center`} loading={!this.props.usersList}>
        <table className={`uk-width-1-2 uk-table uk-table-striped`}>
          <thead>
          <tr>
            <th>Логин</th>
            <th>Имя</th>
            <th>Роль</th>
          </tr>
          </thead>
          <tbody>
          {(this.props.usersList) ? this.props.usersList.map((item) => {
            return <tr key={item.login}>
              <td>{item.login}</td>
              <td>{item.name}</td>
              <td>{item.role}</td>
            </tr>;
          }) : <tr/>}
          </tbody>
        </table>
      </SpinnerWrapper>
    );
  }
}

Users.propTypes = {
  usersList: PropTypes.array,
  getUsersList: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  usersList: usersListSelector(state)
});
const mapDispatchToProps = (dispatch) => ({
  getUsersList: () => {
    dispatch(ActionCreator.usersListFromStorage());
    dispatch(OperationCreator.getUsersListFromApi());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Users);
