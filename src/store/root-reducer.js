/*
 Here we bring in a combine reducers method from Redux
 is just a method that allows us to create a final big reducer that we can use inside of our store by combining smaller reducers together.
 we doing that by the rootReducer
*/

import { combineReducers } from "redux";

import { userReducer } from "./user/user.reducer";
import { categoriesReducer } from "./categories/categories.reducer";
import { cartReducer } from "./cart/cart.reducer";

/* 
The reducer that we're creating is equal to combined reducers.
and then we pass into this parameter of the combined reducer as an object where the keys are.
and the values are going to be the name of the reducer slice and then the actual reducer function itself.

 inside of combineReducers, we're passing an object.
 So the key is gonna be equal to the user and the value to be the userReducer.
 And our actual final state shape is going to be this object where it's got the user and then the actual state of the user reducer.
*/
export const rootReducer = combineReducers({
  user: userReducer,
  categories: categoriesReducer,
  cart: cartReducer,
});
