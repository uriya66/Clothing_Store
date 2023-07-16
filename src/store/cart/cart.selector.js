import { createSelector } from "reselect";

// initial selector that gives back just that slice of the reducer we need which is the cart reducer
const selectCartReducer = (state) => state.cart;

// memorize, getting the actual cart items off a slice of the reducer
export const selectCartItems = createSelector(
  [selectCartReducer],
  (cart) => cart.cartItems
);

// memorize, getting the actual cart is cart open off slice of the reducer
export const selectIsCartOpen = createSelector(
  [selectCartReducer],
  (cart) => cart.isCartOpen
);

// calculate the count when cartItems change
export const selectCartCount = createSelector(
  // createSelector receives selectCartItems, because these cartItems are where we're going to get the total value of these items
  [selectCartItems],
  (cartItems) =>
    cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      // starting value
      0
    )
);

// calculate the total price when cartItems change
export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce(
    (total, cartItems) => total + cartItems.quantity * cartItems.price,
    0
  )
);
