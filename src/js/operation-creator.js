import {encrypt} from "#src/js/functions";
import ActionCreator from "#src/js/action-creator";
import {log} from "#src/js/logger";
import ActionType from "#src/js/action-type";

const OperationCreator = {
  sendLogin: (login, password) => (dispatch, _, {api}) => (async () => {
    const resp = await api.post(`/login`, JSON.stringify({login, password}), {
      headers: {
        'Content-Type': `application/json`
      }
    });

    if (resp.ok) {
      const jsonResp = resp.data;
      localStorage.currentUser = encrypt({
        login,
        username: jsonResp.name,
        role: jsonResp.role
      });

      dispatch(ActionCreator.login());
      return undefined;
    } else {
      return resp.message;
    }
  })(),
  sendLogout: () => (dispatch, _, {api}) => (async () => {
    const resp = await api.post(`/logout`, undefined, {
      headers: {'accept': `application/json`}
    });

    if (resp.ok) {
      delete localStorage.currentUser;
      dispatch(ActionCreator.logout());

      return undefined;
    } else {
      return resp.message;
    }

  })()
};

export default OperationCreator;
