import { UserActionTypes } from "./userActionTypes";

export const setCurrentUser = (user) => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user,
});

export const logoutCurrentUser = () => ({
  type: UserActionTypes.LOGOUT_CURRENT_USER,
});
