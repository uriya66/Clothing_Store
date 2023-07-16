import { CART_ACTION_TYPES } from "./cart.types";

// initial values for the state
const CART_INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
};

export const cartReducer = (state = CART_INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        // when set all so setting just cart items
        cartItems: payload,
      };
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      };
    default:
      // as a result, return the default state
      // actions pass to every single reducer so that means that every single reducer by default needs to return the previous state if none of the cases match the type
      return state;
  }
};
