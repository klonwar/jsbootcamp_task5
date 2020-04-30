import React from "react";
import Header from "#components/header/header";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

const Wrapper = (props) => {
  const {children} = props;

  return (
    <div>
      <Header/>
      <div className={`uk-padding`}>
        {children}
      </div>
    </div>
  );
};

Wrapper.propTypes = {
  children: PropTypes.node.isRequired
};

export default Wrapper;
