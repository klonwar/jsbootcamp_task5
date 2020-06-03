import React, {useState} from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import OperationCreator from "#src/js/operation-creator";
import {connect} from "react-redux";
import SpinnerWrapper from "#components/spinner-wrapper/spinner-wrapper";
import {inf} from "#src/js/logger";

const LogoutLink = (props) => {
  const {sendLogout} = props;
  const [submitting, setSubmitting] = useState(false);

  const handleClick = () => {
    setSubmitting(true);
    sendLogout();
  };

  return (
    <Link to={`#`} className={`uk-position-relative ${(submitting) ? `uk-disabled` : ``}`}
          onClick={handleClick}>
      <SpinnerWrapper loading={submitting} ratio={`.6`}>
        <span>Выйти</span>
      </SpinnerWrapper>
    </Link>
  );
};

LogoutLink.propTypes = {
  sendLogout: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  sendLogout: () => dispatch(OperationCreator.sendLogout())
});

export default connect(null, mapDispatchToProps)(LogoutLink);
