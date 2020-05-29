import React from "react";
import PropTypes from "prop-types";
import {Route} from "react-router-dom";
import Wrapper from "#components/wrapper/wrapper";

const HeaderRoute = (props) => {
  const {children, path, exact = false} = props;

  return (
    <Route exact={exact} path={path} component={(props2) => (
      <Wrapper>
        {React.cloneElement(children, props2)}
      </Wrapper>
    )}/>
  );
};

HeaderRoute.propTypes = {
  children: PropTypes.node.isRequired,
  path: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  exact: PropTypes.bool
};

export default HeaderRoute;
