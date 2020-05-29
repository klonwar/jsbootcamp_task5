import {
  StorageHelper,
} from "#src/js/functions";
import ActionCreator from "#src/js/action-creator";
import {err, inf, log, warn} from "#src/js/logger";

const OperationCreator = {
  sendLogin: (login, password) => (dispatch, _, {api}) => (async () => {
    const resp = await api.post(`/login`, JSON.stringify({login, password}), {
      headers: {
        'Content-Type': `application/json`
      }
    });

    if (resp && resp.ok) {
      const jsonResp = resp.data;
      const state = {
        username: jsonResp.name,
        role: jsonResp.role
      };

      StorageHelper.userInfo.set(state);

      dispatch(ActionCreator.setLogined(state));
      dispatch(ActionCreator.setLoginErrors());
    } else {
      dispatch(ActionCreator.setLoginErrors({login: true, password: true}));
    }

    return true;
  })(),

  sendLogout: () => (dispatch, _, {api}) => (async () => {
    await api.post(`/logout`, undefined, {
      headers: {'accept': `application/json`}
    });

    dispatch(ActionCreator.resetState());

    return true;
  })(),

  loginStateFromApi: () => (dispatch, _, {api}) => (async () => {
    const resp = await api.get(`/me`, {
      headers: {'accept': `application/json`}
    });

    if (resp && resp.ok) {
      const jsonResp = resp.data;
      const state = {
        username: jsonResp.name,
        role: jsonResp.role
      };

      StorageHelper.userInfo.set(state);
      dispatch(ActionCreator.setLogined(state));
    } else {
      dispatch(ActionCreator.resetState());
    }

    return true;
  })(),

  getUsersListFromApi: () => (dispatch, _, {api}) => (async () => {
    const resp = await api.get(`/users`, {
      headers: {'accept': `application/json`}
    });

    if (resp && resp.ok) {
      const jsonResp = resp.data;
      StorageHelper.usersList.set(jsonResp);
      dispatch(ActionCreator.setUsersList(jsonResp));
      dispatch(ActionCreator.setUsersListErrors());
    } else {
      dispatch(ActionCreator.setUsersListErrors({load: true}));
    }

    return true;
  })(),

  getTodoListFromApi: () => (dispatch, _, {api}) => (async () => {
    const resp = await api.get(`/todos`, {
      headers: {'accept': `application/json`}
    });

    if (resp && resp.ok) {
      const jsonResp = resp.data;
      const todoList = {};
      for (let item of jsonResp) {
        todoList[item.id] = {...item};
      }
      StorageHelper.todoList.set(todoList);
      dispatch(ActionCreator.todoListFromStorage());
      dispatch(ActionCreator.setTodoErrors());
    } else {
      dispatch(ActionCreator.setTodoErrors({load: true}));
    }

    return true;
  })(),

  getStateFromStorage: () => (dispatch) => (async () => {
    dispatch(ActionCreator.loginStateFromStorage());

    return true;
  })(),

  getStateFromApi: () => (dispatch) => (async () => {
    dispatch(OperationCreator.loginStateFromApi());

    return true;
  })(),

  getState: () => (dispatch) => (async () => {
    dispatch(OperationCreator.getStateFromStorage());
    dispatch(OperationCreator.getStateFromApi());

    return true;
  })(),

  createNewTodo: (todo) => (dispatch, _, {api}) => (async () => {
    const resp = await api.post(`/todos`, todo, {
      headers: {'accept': `application/json`}
    });

    if (resp && resp.ok) {
      const jsonResp = resp.data;
      StorageHelper.todoList.push(jsonResp);
      dispatch(ActionCreator.todoListFromStorage());
      dispatch(ActionCreator.setTodoErrors());

    } else {
      if (resp) {
        dispatch(ActionCreator.setTodoErrors({add: {...resp.data}}));
      } else {
        dispatch(ActionCreator.setTodoErrors({add: true}));
      }
    }

    return true;
  })(),

  removeTodo: (id, then) => (dispatch, _, {api}) => (async () => {
    const resp = await api.delete(`/todos/${id}`, {
      headers: {'accept': `application/json`}
    });

    if (resp && resp.ok) {
      StorageHelper.todoList.delById(id);
      dispatch(ActionCreator.todoListFromStorage());
      dispatch(ActionCreator.setTodoErrors());
      if (then && typeof then === `function`) {
        then();
      }
    } else {
      if (resp) {
        dispatch(ActionCreator.setTodoErrors({remove: {status: resp.status}}));
      } else {
        dispatch(ActionCreator.setTodoErrors({remove: true}));
      }
    }

    return true;
  })(),

  getTodoById: (id) => (dispatch, _, {api}) => (async () => {
    const resp = await api.get(`/todos/${id}`);

    if (resp && resp.ok) {
      const jsonResp = resp.data;

      StorageHelper.todoList.push(jsonResp);
      dispatch(ActionCreator.todoListFromStorage());
      dispatch(ActionCreator.setTodoErrors());

    } else {
      if (resp) {
        dispatch(ActionCreator.setTodoErrors({load: {status: resp.status}}));
      } else {
        dispatch(ActionCreator.setTodoErrors({load: true}));
      }
    }

    return true;
  })(),

  updateTodo: (todo) => (dispatch, _, {api}) => (async () => {
    const resp = await api.put(`/todos/${todo.id}`, {
      title: todo.title,
      description: todo.description
    }, {
      headers: {'accept': `application/json`}
    });

    if (resp && resp.ok) {
      const itemFromStorage = StorageHelper.todoList.get()[todo.id];
      itemFromStorage.title = todo.title;
      itemFromStorage.description = todo.description;
      StorageHelper.todoList.push(itemFromStorage);

      dispatch(ActionCreator.todoListFromStorage());
      dispatch(ActionCreator.setTodoErrors());
    } else {
      if (resp) {
        dispatch(ActionCreator.setTodoErrors({put: {...resp.data}}));
      } else {
        dispatch(ActionCreator.setTodoErrors({put: true}));
      }
    }

    return true;
  })(),

};

export default OperationCreator;
