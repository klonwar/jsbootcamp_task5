import React from "react";
import {decrypt} from "#src/js/functions.jsx";

const Main = () => {
  const jsonData = decrypt(localStorage.currentUser);
  return (
    <div className={`uk-flex uk-flex-center`}>
      {`Welcome, ${jsonData.username}!`}
    </div>
  );
};

export default Main;
