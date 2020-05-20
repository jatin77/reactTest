import { alertActionTypes } from "./alertActionTypes";

export const showAlert = (alert) => {
  return {
    type: alertActionTypes.SHOW_ALERT,
    payload: alert,
  };
};
