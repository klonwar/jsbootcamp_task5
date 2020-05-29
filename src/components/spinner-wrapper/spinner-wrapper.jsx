import React from "react";
import PropTypes from "prop-types";
import {inf} from "#src/js/logger";

const SpinnerWrapper = (props) => {
  const {
    isError = false,
    ratio = `1`,
    className,
    relative,
    errorHandler = () => {}
  } = props;

  let loading = (typeof props.loading === `function`) ? props.loading() : props.loading;
  const inner = (
    <>
      <span className={`uk-position-center ${(!loading) ? `uk-invisible` : ``}`} uk-spinner={`ratio: ${ratio}`}/>
      <button className={`uk-button uk-position-center ${(!isError) ? `uk-hidden` : ``}`}
              onClick={errorHandler} uk-icon={`icon: refresh; ratio: ${ratio}`}/>
      <div className={`${(loading || isError) ? `uk-invisible` : ``} ${(className) ? className : ``}`}>
        {props.children}
      </div>
    </>

  );

  return (!relative) ? inner : <div className={`uk-position-relative`}>{inner}</div>;
};

SpinnerWrapper.propTypes = {
  children: PropTypes.node,
  loading: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]).isRequired,
  isError: PropTypes.bool,
  relative: PropTypes.bool,
  errorHandler: PropTypes.func,
  ratio: PropTypes.string,
  className: PropTypes.string
};

export default SpinnerWrapper;
