import React from "react";
import * as ReactDOM from "react-dom";
import App from "#components/app/app";
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {createStore, applyMiddleware} from "redux";
import "#src/css/style.less";
import {reducer} from "#src/js/reducer";
import thunk from "redux-thunk";
import {compose} from "recompose";
import createApi from "#src/js/api";
import ErrorBoundary from "#components/error-boundary/error-boundary";
import OperationCreator from "#src/js/operation-creator";
import ActionCreator from "#src/js/action-creator";

(() => {
  UIkit.use(Icons);

  const api = createApi((...args) => store.dispatch(...args));

  const store = createStore(
    reducer,
    compose(
      applyMiddleware(thunk.withExtraArgument({api})),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  );

  store.dispatch(OperationCreator.getState());

  ReactDOM.render((
      <BrowserRouter>
        <Provider store={store}>
          <ErrorBoundary>
            <App/>
          </ErrorBoundary>
        </Provider>
      </BrowserRouter>
    ),
    document.querySelector(`#root`)
  );

})();
