import React from "react";
import {Form, Field} from "react-final-form";
import {log, warn} from "#src/js/logger";
import {Link, Redirect} from "react-router-dom";
import PropTypes from "prop-types";
import OperationCreator from "#src/js/operation-creator";
import {connect} from "react-redux";

const Login = (props) => {
  const {isLogined, sendLogin} = props;

  if (isLogined) {
    return <Redirect to={`/`}/>;
  }

  const onSubmit = async (items) => {
    const {login, password} = items;

    const resp = await sendLogin(login, password);

    if (resp) {
      return {login: `error`, password: `error`};
    }

    return undefined;
  };

  const createInput = (data) => {
    const instError = data.meta.error && data.meta.touched;
    const submError = data.meta.submitError && !data.meta.active;

    return (
      <div>
        <div className={`uk-inline uk-width-1-1`}>
          <span className={`uk-form-icon`} uk-icon={`icon: ${data.icon}`}/>
          <input {...data.input} disabled={data.disabled}
                 className={`uk-input ${(instError || submError) ? `uk-form-danger` : ``}`}/>
        </div>
      </div>
    );
  };

  const composeValidators = (...validators) => (value) => validators.reduce((e, validator) => e || validator(value), false);
  const minLength = (length) => (value) => ((value + ``).length >= length) ? undefined : `min length ${length}`;
  const required = (value) => (value ? undefined : `required`);
  const loginValidator = composeValidators(minLength(3), required);
  const passwordValidator = composeValidators(minLength(3), required);

  return (
    <div className={`uk-position-center`}>
      <div className={`uk-card uk-card-default uk-card-body`}>
        <h3 className={`uk-card-title`}>
          Войдите
        </h3>
        <div className={``}>
          <Form
            onSubmit={onSubmit}
            render={({handleSubmit, submitting}) => (
              <form uk-margin={``} onSubmit={handleSubmit}>
                <Field name={`login`} disabled={submitting} type={`text`} icon={`user`}
                       validate={loginValidator}>
                  {createInput}
                </Field>
                <Field name={`password`} disabled={submitting} type={`password`} icon={`lock`}
                       validate={passwordValidator}>
                  {createInput}
                </Field>

                <div uk-grid={``}>
                  <div>
                    <button className={`uk-button uk-button-default`} disabled={true}>Регистрация</button>
                  </div>
                  <div className={`uk-width-expand`}>
                    <button
                      className={`uk-button uk-button-primary uk-width-1-1 uk-position-relative`}
                      type={`submit`} disabled={submitting}>
                      <span className={(submitting) ? `uk-invisible` : ``}>Вход</span>
                      <span className={`uk-position-center ${(submitting) ? `` : `uk-invisible`}`}
                            uk-spinner={`ratio: .6`}/>
                    </button>
                  </div>
                </div>
              </form>
            )}
          />
        </div>
      </div>
    </div>
  );

};

Login.propTypes = {
  isLogined: PropTypes.bool.isRequired,
  sendLogin: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  isLogined: state.isLogined
});

const mapDispatchToProps = (dispatch) => ({
  sendLogin: (login, password) => dispatch(OperationCreator.sendLogin(login, password)),
});


export default connect(mapStateToProps, mapDispatchToProps)(Login);
