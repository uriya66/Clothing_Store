import { CATEGORIES_ACTION_TYPES } from "./categories.types";

// initial value for the state
export const CATEGORIES_INITIAL_STATE = {
  categories: [],
};

// storing the current user value by reducer
export const categoriesReducer = (
  // the state by default is CATEGORIES_INITIAL_STATE
  state = CATEGORIES_INITIAL_STATE,
  // if no action is passed and the reducer runs so by default we pass an empty object
  action = {}
) => {
  const { type, payload } = action;

  switch (type) {
    case CATEGORIES_ACTION_TYPES.SET_CATEGORIES:
      return { ...state, categories: payload };
    default:
      // as a result, return the default state
      // actions pass to every single reducer so that means that every single reducer by default needs to return the previous state if none of the cases match the type
      return state;
  }
};
