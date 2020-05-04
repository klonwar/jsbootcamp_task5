import ActionType from "#src/js/action-type";
import {decrypt} from "#src/js/functions";
import React from "react";
import {err} from "#src/js/logger";

const ActionCreator = {
  login: () => ({
    type: ActionType.LOGIN,
  }),

  logout: () => ({
    type: ActionType.LOGOUT,
  }),

  loginStateFromStorage: () => {
    try {
      decrypt(localStorage.currentUser);
    } catch (e) {
      return {
        type: ActionType.LOGOUT,
      };
    }

    return {
      type: ActionType.LOGIN,
    };
  },
};

export default ActionCreator;
