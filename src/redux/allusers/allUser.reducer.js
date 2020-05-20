import { AllUserActionTypes } from "./allUserActionTypes";
import { updateUserToUserList } from "./allUser.utils";

const INITIAL_STATE = {
  usersList: null,
  isLoading: false,
  viewDetailUserID: null,
};

const allUsersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AllUserActionTypes.GET_ALL_USERS:
      return {
        ...state,
        usersList: action.payload,
        isLoading: false,
      };
    case AllUserActionTypes.LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case AllUserActionTypes.ERROR:
      return {
        ...state,
        isLoading: false,
      };
    case AllUserActionTypes.VIEW_USER_DETAIL:
      return {
        ...state,
        viewDetailUserID: action.payload,
      };
    case AllUserActionTypes.DELETE_USER:
      return {
        ...state,
        usersList: state.usersList.filter((user) => user.id !== action.payload),
        viewDetailUserID:
          state.viewDetailUserID === action.payload
            ? null
            : state.viewDetailUserID,
      };
    case AllUserActionTypes.ADD_USER:
      return {
        ...state,
        usersList: [action.payload, ...state.usersList],
      };
    case AllUserActionTypes.UPDATE_USER:
      return {
        ...state,
        usersList: updateUserToUserList(state.usersList, action.payload),
      };
    default:
      return state;
  }
};

export default allUsersReducer;
