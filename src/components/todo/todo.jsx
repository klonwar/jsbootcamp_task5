import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {
  isAdminSelector,
  roleSelector,
  todoListSelector,
  todoLoadErrorSelector,
  todoPutErrorMessageSelector
} from "#src/js/selectors";
import OperationCreator from "#src/js/operation-creator";
import SpinnerWrapper from "#components/spinner-wrapper/spinner-wrapper";
import {Form, Field} from "react-final-form";
import {todoDescriptionValidator, todoTitleValidator} from "#src/js/validators";
import ActionCreator from "#src/js/action-creator";
import {Redirect, withRouter} from "react-router-dom";
import DeleteButton from "#components/delete-button/delete-button";

class Todo extends React.PureComponent {
  componentDidMount() {
    this.props.loadTodoById(this.props.match.params.id);
  }

  createInput = (data) => {
    const instError = data.meta.error && data.meta.touched;
    const submError = data.submitError && !data.meta.active;
    const error = instError || submError;

    const submMessage = (data.submitError) ? data.submitError : ``;
    const instMessage = (data.meta.error) ? data.meta.error : ``;
    let message = (submMessage) ? submMessage : instMessage;
    if (!error) {
      message = ``;
    }
    return (
      <input {...data.input}
             disabled={data.disabled}
             className={`uk-input uk-form-blank ${(data.className) ? data.className : ``} ${(error) ? `uk-form-danger` : ``}`}
             placeholder={(data.placeholder) ? data.placeholder : ``}
             form={data.form} uk-tooltip={`title: ${message}`}
      />
    );
  };

  proposalBody = (todoItem) => {
    if (!(this.props.isAdmin || this.props.role === todoItem.createdBy)) {
      return (
        <div className={`uk-card-body`}>
          <span className={`uk-card-badge uk-label`}>
                {todoItem.createdBy}
              </span>
          <h3 className={`uk-card-title`}>
            {todoItem.title}
          </h3>

          <p>{todoItem.description}</p>
        </div>
      );
    }

    return (
      <Form onSubmit={(data) => this.props.updateTodo({...data, id: this.props.match.params.id})}
            render={({handleSubmit, submitting, form}) => (
              <>
                <div className={`uk-card-body`}>
                  <form onSubmit={handleSubmit} autoComplete={`off`} id={`editTodoForm`}/>
                  <span className={`uk-card-badge uk-label`}>{todoItem.createdBy}</span>

                  <p className={`uk-card-title`}>
                    <Field disabled={submitting} name={`title`} initialValue={todoItem.title} className={``}
                           placeholder={`Название`}
                           form={`editTodoForm`} validate={todoTitleValidator}
                           submitError={(this.props.putMessage) ? this.props.putMessage : ``}>
                      {this.createInput}
                    </Field>
                  </p>

                  <Field disabled={submitting} name={`description`} initialValue={todoItem.description}
                         placeholder={`Описание`}
                         form={`editTodoForm`} validate={todoDescriptionValidator}>
                    {this.createInput}
                  </Field>
                </div>
                <div className={`uk-card-footer`}>
                  <div className={`uk-flex uk-flex-between`}>

                    <DeleteButton createdBy={todoItem.createdBy} id={this.props.match.params.id}
                                  then={() => this.props.history.push(`/todos`)}
                                  text={`Удалить`} className={`uk-button uk-button-danger uk-position-relative`}/>

                    <button disabled={submitting} form={`editTodoForm`} type={`submit`}
                            className={`uk-button uk-button-primary uk-position-relative`}
                            onClick={() => form.change(`type`, `update`)}>
                      <span className={(submitting) ? `uk-invisible` : ``}>Сохранить</span>
                      <span className={`uk-position-center ` + ((submitting) ? `` : `uk-invisible`)}
                            uk-spinner={`ratio: 0.6`}/>
                    </button>
                  </div>
                </div>
              </>
            )}/>

    );
  };


  render() {
    let todoItem = this.props.todoList?.[this.props.match.params.id];
    if (!todoItem) {
      todoItem = {};
    }

    if (this.props.loadError) {
      this.props.clearTodoErrors();
      return <Redirect to={`/todos`}/>;
    }

    return (
      <SpinnerWrapper className={`uk-width-1-1 uk-flex uk-flex-center`}
                      loading={!this.props.todoList?.[this.props.match.params.id]}>
        <div className={`uk-card  uk-card-default uk-width-3-5`}>
          {this.proposalBody(todoItem)}
        </div>

      </SpinnerWrapper>
    );
  }
}

Todo.propTypes = {
  match: PropTypes.object,
  todoList: PropTypes.object,
  loadTodoById: PropTypes.func.isRequired,
  updateTodo: PropTypes.func.isRequired,
  clearTodoErrors: PropTypes.func.isRequired,
  role: PropTypes.string.isRequired,
  putMessage: PropTypes.string,
  isAdmin: PropTypes.bool.isRequired,
  loadError: PropTypes.object,
  history: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  todoList: todoListSelector(state),
  role: roleSelector(state),
  isAdmin: isAdminSelector(state),
  putMessage: todoPutErrorMessageSelector(state),
  loadError: todoLoadErrorSelector(state)
});
const mapDispatchToProps = (dispatch) => ({
  loadTodoById: (id) => dispatch(OperationCreator.getTodoById(id)),
  updateTodo: (todo) => dispatch(OperationCreator.updateTodo(todo)),
  clearTodoErrors: () => dispatch(ActionCreator.setTodoErrors())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Todo));
