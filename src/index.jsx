import React from "react";
import * as ReactDOM from "react-dom";
import App from "#components/app/app";
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import {BrowserRouter} from "react-router-dom";
import "#src/css/style.less";
import {baseURL} from "#src/js/constants";

UIkit.use(Icons);

ReactDOM.render((
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  ),
  document.querySelector(`#root`)
);


