/*
  useSelctore is a hook that passes a selector function 
  and a selector function is something that essentially extracts off the values that we want from the whole entire Redux store

  the state is one big object and the object is composed of all the smaller reducers
  but in the end, it's really just an object that has these key values on them.
  So actually receive inside of our selector function, whenever you call your selector, the entire state object.
  So for specifically userReducer we going to have to stay a state user.
  And then from the user state, we're going to want further the current user property.
  And then cast this to some variable that calls the current user.
  And now the current user being referenced will be this current user object inside of the store.
*/

// the selector will go into redux state and get the userReducer and inside userReducer it's get the currentUser
export const selectCurrentUser = (state) => state.user.currentUser;
