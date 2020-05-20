import { UserActionTypes } from "./userActionTypes";

const INITIAL_STATE = {
  currentUser: null,
  isAuthenticated: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload.userName,
        isAuthenticated: true,
      };
    case UserActionTypes.LOGOUT_CURRENT_USER:
      return {
        ...state,
        currentUser: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default userReducer;
