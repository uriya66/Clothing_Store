import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
// we import in a provider from React Redux that is Redux provider
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import "./index.scss";
import App from "./App";
import { store, persistor } from "./store/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* 
    Redux is available throughout the entire application and redux has always been using context API
    so Redux has a provider and we pass in the store, provider is expecting a store that we created as an argument.
    */}
    <Provider store={store}>
      {/* loading renders something, can pass a component or something else */}
      {/* when it's trying to determine how long it takes to rehydrate the store (null - it'll render nothing until persist is finished)*/}
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          {/* Products are able to reach up into the user provider and get the value */}
          {/* user provider can't necessarily go into his children in order to fetch the data */}
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
