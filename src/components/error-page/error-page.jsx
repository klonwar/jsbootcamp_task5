import React from "react";
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";

const ErrorPage = (props) => {
  const {message = `Произошла ошибка`, secondary = `Мы уже работаем над ее исправлением`, history} = props;

  return (
    <div className={`uk-position-center`}>
      <div className={`uk-text-center`}>
        <h1>{message}</h1>
        <h3 className={`uk-margin-remove-top`}>{secondary}</h3>
        <div>
          <button onClick={() => history.go(0)} uk-icon={`icon: refresh; ratio: 1.6`}/>
        </div>
      </div>
    </div>
  );
};

ErrorPage.propTypes = {
  message: PropTypes.string,
  secondary: PropTypes.string,
  history: PropTypes.object.isRequired
};

export default withRouter(ErrorPage);
