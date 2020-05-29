import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import OperationCreator from "#src/js/operation-creator";
import ActionCreator from "#src/js/action-creator";
import {log} from "#src/js/logger";
import SpinnerWrapper from "#components/spinner-wrapper/spinner-wrapper";
import NewTodo from "#components/new-todo/new-todo";
import {todoListSelector} from "#src/js/selectors";
import {Link} from "react-router-dom";
import DeleteButton from "#components/delete-button/delete-button";

/**
 *
 * @param todoListItem {object}
 * @param todoListItem.title {string}
 * @param todoListItem.description {string}
 * @param todoListItem.createdBy {string}
 *
 * */


class TodoList extends React.PureComponent {
  componentDidMount() {
    this.props.getTodoList();
  }

  render() {
    return (
      <SpinnerWrapper className={`uk-width-1-1 uk-flex uk-flex-center`} loading={!this.props.todoList}>
        <table className={`uk-width-1-1 uk-table uk-table-striped`}>
          <thead>
          <tr>
            <th>Название</th>
            <th>Описание</th>
            <th>Создатель</th>
            <th>Действия</th>
          </tr>
          </thead>
          <tbody>
          {(this.props.todoList) ? Object.keys(this.props.todoList).map((key) => {
            let todoListItem = this.props.todoList[key];
            return <tr key={todoListItem.id}>
              <td className={`uk-text-nowrap`}>{todoListItem.title}</td>
              <td className={`uk-text-nowrap`}>{todoListItem.description}</td>
              <td className={`uk-text-nowrap`}>{todoListItem.createdBy}</td>
              <td className={`uk-flex uk-flex-around uk-child-width-expand uk-height-1-1 uk-padding-remove`}>
                <Link className={`uk-button uk-button-text`} style={{display: `flex`, justifyContent: `center`}}
                      to={`/todo/${todoListItem.id}`} uk-icon={`icon: search`}/>
                <DeleteButton createdBy={todoListItem.createdBy} className={`uk-height-1-1 uk-width-1-1 uk-button uk-button-text`} id={todoListItem.id} icon={`close`}/>
              </td>
            </tr>;
          }) : <tr/>}
          <NewTodo/>
          </tbody>
        </table>

      </SpinnerWrapper>
    );
  }
}

TodoList.propTypes = {
  todoList: PropTypes.object,
  getTodoList: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  todoList: todoListSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
  getTodoList: () => {
    dispatch(ActionCreator.todoListFromStorage());
    dispatch(OperationCreator.getTodoListFromApi());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
