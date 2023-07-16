import { USER_ACTION_TYPES } from "./user.types";

// initial value for the state
const USER_INITIAL_STATE = {
  currentUser: null,
};

// storing the current user value by reducer
export const userReducer = (state = USER_INITIAL_STATE, action = {}) => {
  //console.log("dispatched");
  //console.log(action);
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        // return the same values on the previous state object and anything afterward overwrite
        ...state,
        currentUser: payload,
      };
    default:
      // as a result, return the default state
      // actions pass to every single reducer so that means that every single reducer by default needs to return the previous state if none of the cases match the type
      return state;
  }
};
