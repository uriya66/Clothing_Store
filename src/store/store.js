/*
 This store is almost a combined place where all of our redux happens
 where our state lives, but also where we receive actions and we dispatch them into our reducers to update the state.
 We need this store file because inside is where we're going to generate the store object that we will
 use inside of our React application in order to do this.

 We need to import three different methods from Redux (the core Redux library).
 We need to import - compose, create-store, and apply middleware.
 And also need to import the logger from redux-logger.

 Every store needs reducers and these reducers are what allow us to actually form the state object.
*/

import {
  compose,
  applyMiddleware,
  legacy_createStore as createStore,
} from "redux";

import { persistStore, persistReducer } from "redux-persist";
import logger from "redux-logger";
// use local storage
import storage from "redux-persist/lib/storage";
// rootReducer is the combination of all reducers
import { rootReducer } from "./root-reducer";

// our logger Middleware
//import { loggerMiddleware } from "./middleware/logger";

// configuration object that tells to redux-persist what we want
const persistConfig = {
  // key is the part to start and root means persist the whole thing from the root level
  key: "root",
  // what to store in storage
  storage: storage,
  // blacklist is an array of strings values of rootReducer that don't want to persist ( whitelist is an array of strings values of rootReducer that want to persist )
  // we don't want to persist the user because this might conflict and clash with local storage
  blacklist: ["user"],
};

/*
the logger we're created passes to the middleware
for not console.log on production we leverage the process environment node environment to tell us if we are in development or production based on the string
if our node environment is a development only then render the logger
if that is false, the node environment is equal to production, and for not passing false as a middleware we filter out by boolean
the filter essentially filters out anything where it is not true

middleWares kind of like little library helpers that run before an action hits the reducer
whenever dispatch an action it hits the middleware and then the action hits the reducers and log out the state
*/

// if our node environment is not on production - then don't render the logger
const middleWares = [process.env.NODE_ENV !== "production" && logger].filter(
  Boolean
);

/*
--FOR REDUX DEVTOOLS--
if we're not in production and there's a window object and DevTools exist
then DevTools (just Chrome) is going to attach this to the window object which is their own compose otherwise use the compose that we have from Redux
and then call our composeEnhancer instead of compose
const composeEnhancer = (process.env.NODE_ENV !== "production" && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
*/

// create persistedReducer with rootReducer and configuration persist
const persistedReducer = persistReducer(persistConfig, rootReducer);

/*
call to applyMiddleware and generate it using compose function that pass multiple functions
it'll pass every single middleware that we have if we had more
and allow us to spread into the applyMiddleware argument as subsequent arguments
*/
const composedEnhancers = compose(applyMiddleware(...middleWares));

/*
create the store and this store takes 3 arguments:

--The first needs a rootReducer in order to generate the store or persistedReducer that using in rootReducer
all reducers are pure functions, functions that receive a state and an action.
and in turn, they return you back some object that represents the values in the state.
this store is just in order to facilitate the movement and passing of actions through these reducers.

--The second argument is if you want to add any additional default states here this is added so that - that optional so for now we pass undefined

--The third is the logger and the logger is essentially something that allows us to see what the state looks like before an action is dispatched,
what the action is, and how the state, in turn, looks after the action. (using in middleWares by composedEnhancers)
*/
export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);

// persistor object using store object
export const persistor = persistStore(store);
