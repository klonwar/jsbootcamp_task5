import React from "react";
import {decrypt} from "#src/js/functions.jsx";
import {StorageHelper} from "#src/js/functions";

const Main = () => {
  const jsonData = StorageHelper.userInfo.get();
  return (
    <div className={`uk-flex uk-flex-center`}>
      {`Привет, ${jsonData.username}! Ты - ${jsonData.role}.`}
    </div>
  );
};

export default Main;
