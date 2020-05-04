import ActionType from "#src/js/action-type";

const initialState = {
  isLogined: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOGIN:
      return {...state, isLogined: true};
    case ActionType.LOGOUT:
      return {...state, isLogined: false};
    default:
      return state;
  }
};

export {
  reducer
};
