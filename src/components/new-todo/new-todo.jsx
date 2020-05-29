import React from "react";
import PropTypes from "prop-types";
import {Form, Field} from "react-final-form";
import {todoDescriptionValidator, todoTitleValidator} from "#src/js/validators";
import {connect} from "react-redux";
import OperationCreator from "#src/js/operation-creator";
import {todoAddErrorMessageSelector} from "#src/js/selectors";

const NewTodo = ({addTodo, addErrorMessage}) => {
  const onSubmit = (items) => addTodo(items);
  const createInput = (data) => {
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

  return <Form onSubmit={onSubmit} render={({handleSubmit, submitting}) => (
    <tr className={`uk-placeholder`}>
      <td>
        <form onSubmit={handleSubmit} id={`newTodoForm`} autoComplete={`off`}/>
        <Field disabled={submitting} name={`title`} className={`uk-width-medium`} placeholder={`Название`}
               form={`newTodoForm`} validate={todoTitleValidator} submitError={addErrorMessage}>
          {createInput}
        </Field>
      </td>
      <td className={`uk-width-expand`}>
        <Field disabled={submitting} name={`description`} className={`uk-width-expand`} placeholder={`Описание`}
               form={`newTodoForm`} validate={todoDescriptionValidator}>
          {createInput}
        </Field>
      </td>
      <td>
      </td>
      <td className={`uk-flex uk-flex-center uk-width-1-1 uk-height-1-1 uk-padding-remove`}>
        <button disabled={submitting} type={`submit`} className={`uk-button uk-button-text uk-width-1-1 uk-padding-small`}
                form={`newTodoForm`}>
          <span className={(submitting) ? `uk-hidden` : ``} uk-icon={`icon: plus`}/>
          <span className={(submitting) ? `` : `uk-hidden`} uk-spinner={``}/>
        </button>
      </td>
    </tr>

  )}/>;
};

NewTodo.propTypes = {
  addTodo: PropTypes.func.isRequired,
  addErrorMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),

};

const mapStateToProps = (state) => ({
  addErrorMessage: todoAddErrorMessageSelector(state)
});

const mapDispatchToProps = (dispatch) => ({
  addTodo: (todo) => dispatch(OperationCreator.createNewTodo(todo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewTodo);
