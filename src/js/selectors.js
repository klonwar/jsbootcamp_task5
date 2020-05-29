import {createSelector} from "reselect";

export const isLoginedSelector = (state) => state.isLogined;
export const todoListSelector = (state) => state.todoList;
export const usernameSelector = (state) => state.userInfo.username;
export const roleSelector = (state) => state.userInfo.role;
export const isAdminSelector = createSelector(roleSelector, (role) => role === `admin`);
export const usersListSelector = (state) => state.usersList;

export const loginErrorSelector = (state) => state.errors?.login?.login;
export const passwordErrorSelector = (state) => state.errors?.login?.password;
export const todoLoadErrorSelector = (state) => state.errors?.todo?.load;
export const todoAddErrorMessageSelector = (state) => (state.errors?.todo?.add?.message) ? state.errors?.todo?.add?.message : state.errors?.todo?.add;
export const todoPutErrorMessageSelector = (state) => (state.errors?.todo?.put?.message) ? state.errors?.todo?.put?.message : state.errors?.todo?.put;
export const usersLoadErrorSelector = (state) => state.errors?.users?.load;
export const serverErrorSelector = (state) => state.errors?.server;

