import React from "react";
import SpinnerWrapper from "#components/spinner-wrapper/spinner-wrapper";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {isAdminSelector, roleSelector} from "#src/js/selectors";
import OperationCreator from "#src/js/operation-creator";

class DeleteButton extends React.PureComponent {
  state = {
    loading: false
  };

  render() {
    if (this.props.role === this.props.createdBy || this.props.isAdmin || !this.props.createdBy) {
      return (
        <SpinnerWrapper relative={true} loading={this.state.loading} ratio={`0.6`} className={`uk-height-1-1`}>
          {
            (this.props.icon)
              ? <button className={this.props.className} uk-icon={`icon: ${this.props.icon}`}
                        onClick={() => {
                          this.setState({loading: true});
                          this.props.removeById(this.props.id, this.props.then);
                        }}/>
              : <button className={this.props.className}
                        onClick={() => {
                          this.setState({loading: true});
                          this.props.removeById(this.props.id, this.props.then);
                        }}>{this.props.text}</button>
          }
        </SpinnerWrapper>
      );
    }
    return null;
  }
}

DeleteButton.propTypes = {
  removeById: PropTypes.func.isRequired,
  then: PropTypes.func,
  role: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  icon: PropTypes.string,
  text: PropTypes.string,
  className: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  createdBy: PropTypes.string
};

export default connect(
  (state) => ({
    isAdmin: isAdminSelector(state),
    role: roleSelector(state)
  }),
  (dispatch) => ({
    removeById: (id, then) => dispatch(OperationCreator.removeTodo(id, then))
  })
)(DeleteButton);
