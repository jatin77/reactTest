import { alertActionTypes } from "./alertActionTypes";

const INITIAL_STATE = {
  msg: "",
  alertType: "",
  open: false,
};

const alertReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case alertActionTypes.SHOW_ALERT:
      return {
        ...state,
        msg: action.payload.msg,
        alertType: action.payload.alertType,
        open: true,
      };

    default:
      return state;
  }
};

export default alertReducer;
