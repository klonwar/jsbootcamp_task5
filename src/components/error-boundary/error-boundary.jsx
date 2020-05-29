import React from "react";
import PropTypes from "prop-types";
import {err} from "#src/js/logger";
import ErrorPage from "#components/error-page/error-page";
import {connect} from "react-redux";
import {serverErrorSelector} from "#src/js/selectors";

class ErrorBoundary extends React.Component {
  state = {
    error: null
  };

  static getDerivedStateFromError(error) {
    err(error.message);
    return {
      error: err
    };
  }

  render() {
    if (this.state.error) {
      return <ErrorPage/>;
    }

    if (this.props.serverError) {
      return <ErrorPage message={`Ошибка ` + this.props.serverError?.code} secondary={``}/>;
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  serverError: PropTypes.object
};

const mapStateToProps = (state) => ({
  serverError: serverErrorSelector(state)
});

export default connect(mapStateToProps)(ErrorBoundary);
