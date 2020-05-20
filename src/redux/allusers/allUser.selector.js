import { createSelector } from "reselect";

const selectAllUsers = (state) => state.allUsers;

export const selectAllUsersList = createSelector(
  [selectAllUsers],
  (userList) => userList
);
