import ActionType from "#src/js/action-type";
import {err} from "#src/js/logger";

const initialState = {
  isLogined: false,
  userInfo: {},
  errors: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOGIN:
      return {
        ...state,
        isLogined: true,
        userInfo: {...action.payload}
      };
    case ActionType.LOGOUT:
      return {...initialState};
    case ActionType.FILL_USERS_LIST:
      return {...state, usersList: [...action.payload]};
    case ActionType.FILL_TODO_LIST:
      return {...state, todoList: {...action.payload}};
    case ActionType.SERVER_ERROR:
      return {
        ...state,
        errors: {
          ...state.errors,
          server: {...action.payload}
        }
      };
    case ActionType.LOGIN_ERROR:
      return {
        ...state,
        errors: {
          ...state.errors,
          login: {...action.payload}
        }
      };
    case ActionType.TODO_ERROR:
      return {
        ...state,
        errors: {
          ...state.errors,
          todo: {...action.payload}
        }
      };
    case ActionType.USERS_LIST_ERROR:
      return {
        ...state,
        errors: {
          ...state.errors,
          users: {...action.payload}
        }
      };
    default:
      return state;
  }
};

export {
  reducer
};
