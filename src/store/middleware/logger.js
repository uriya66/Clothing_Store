/*
console.log our loggerMiddleware
The format of middleware always follows the same signature 
It's going to be three functions that return from one another by using currying a function 

The first function receives the store object
This in turn returns another function that receives the next method
Then the next function this returns receives the action
*/
export const loggerMiddleware = (store) => (next) => (action) => {
  // if no action type (Sometimes you might receive an action that we may not need to receive)
  if (!action.type) {
    // pass it along so we call the next action
    return next(action);
  }
  //  if there is an action type on it, print it
  console.log("type: ", action.type);
  console.log("payload: ", action.payload);
  // getState will give us back the value of the current state
  console.log("currentState: ", store.getState());
  /*
until now that shows us the previous state
and for show the next state we need to get this is from the store object after it's updated once it's run through all of the reducers with the action
this is happening synchronously the moment this next call
when that is complete will run any code after this next call
*/
  next(action);
  // getState will give us back the value of the next state
  console.log("next state: ", store.getState());
};
