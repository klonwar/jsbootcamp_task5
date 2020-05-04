import React from "react";
import {Redirect} from "react-router-dom";

const Logout = () => {
  delete localStorage.currentUser;
  return <Redirect to={`/login`}/>;
};

export default Logout;
