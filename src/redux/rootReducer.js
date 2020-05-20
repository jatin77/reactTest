import { combineReducers } from "redux";
import userReducer from "./user/user.reducer";
import allUsersReducer from "./allusers/allUser.reducer";
import alertReducer from "./alerts/alert.reducer";

const rootReducer = combineReducers({
  user: userReducer,
  allUsers: allUsersReducer,
  alert: alertReducer,
});

export default rootReducer;
