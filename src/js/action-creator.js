import ActionType from "#src/js/action-type";
import React from "react";
import {StorageHelper} from "#src/js/functions";

const ActionCreator = {
  doNothing: () => ({
    type: ActionType.NOTHING
  }),

  setLogined: (payload = {}) => ({
    type: ActionType.LOGIN,
    payload
  }),

  setUsersList: (payload = []) => ({
    type: ActionType.FILL_USERS_LIST,
    payload
  }),

  setTodoList: (payload = []) => ({
    type: ActionType.FILL_TODO_LIST,
    payload
  }),

  setServerErrors: (payload = {}) => ({
    type: ActionType.SERVER_ERROR,
    payload
  }),

  setLoginErrors: (payload = {}) => ({
    type: ActionType.LOGIN_ERROR,
    payload
  }),

  setUsersListErrors: (payload = {}) => ({
    type: ActionType.USERS_LIST_ERROR,
    payload
  }),

  setTodoErrors: (payload = {}) => ({
    type: ActionType.TODO_ERROR,
    payload
  }),

  resetState: () => {
    StorageHelper.clear();
    return {
      type: ActionType.LOGOUT,
    };
  },

  loginStateFromStorage: () => {
    let state;
    try {
      state = StorageHelper.userInfo.get();
    } catch (e) {
      return ActionCreator.resetState();
    }

    return ActionCreator.setLogined(state);
  },

  usersListFromStorage: () => {
    let state;
    try {
      state = StorageHelper.usersList.get();
    } catch (e) {
      return ActionCreator.doNothing();
    }

    return ActionCreator.setUsersList(state);
  },

  todoListFromStorage: () => {
    let state;
    try {
      state = StorageHelper.todoList.get();
    } catch (e) {
      return ActionCreator.doNothing();
    }

    return ActionCreator.setTodoList(state);
  },
};

export default ActionCreator;
