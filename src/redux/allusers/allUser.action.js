import { AllUserActionTypes } from "./allUserActionTypes";
import Axios from "axios";
import { showAlert } from "../alerts/alert.action";

export const saveAllUsers = (allUsers) => ({
  type: AllUserActionTypes.GET_ALL_USERS,
  payload: allUsers,
});

export const viewUserDetail = (userID) => ({
  type: AllUserActionTypes.VIEW_USER_DETAIL,
  payload: userID,
});

export const deleteUser = (userID) => ({
  type: AllUserActionTypes.DELETE_USER,
  payload: userID,
});

export const addUser = (user) => ({
  type: AllUserActionTypes.ADD_USER,
  payload: user,
});

export const updateUser = (user) => ({
  type: AllUserActionTypes.UPDATE_USER,
  payload: user,
});

export const loading = () => ({
  type: AllUserActionTypes.LOADING,
});

export const error = () => ({
  type: AllUserActionTypes.ERROR,
});

export const fetchAllUsers = () => {
  const baseUrl = "https://api.github.com/users";
  return (dispatch) => {
    dispatch(loading());
    Axios.get(`${baseUrl}`)
      .then((res) => {
        dispatch(saveAllUsers(res.data));
      })
      .catch((err) => {
        dispatch(error());
        dispatch(
          showAlert({
            msg: "Something went wrong while fetching Users",
            alertType: "error",
          })
        );
      });
  };
};
