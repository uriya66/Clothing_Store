import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";
import ContactForm from "./components/contact-form/contact-form.component";
import { setCurrentUser } from "./store/user/user.action";
import {
  onAuthStateChangedListener,
  creatUserDocumentFromAuth,
} from "./utils/firebase/firebase.utils";

const App = () => {
  // dispatch is actions to the root-reducer which in turn passes the action to every single reducer function
  const dispatch = useDispatch();

  useEffect(() => {
    // return function that stops listening
    const unsubscribe = onAuthStateChangedListener((user) => {
      // the user that gets passed through is authentication (sign in) or null (sign out)
      // create a user document if the user comes through
      if (user) {
        creatUserDocumentFromAuth(user);
      }
      // set to whatever user is (sign in/sign out)
      dispatch(setCurrentUser(user));
    });
    // run whatever return from callback
    return unsubscribe;
    // React does not know that this dependency that it's getting from a hook
    // this dispatch doesn't change so that is why we wrote it but we don't must to write it
  }, [dispatch]);

  // only renders when the URL is pointing to home
  return (
    // allow to application to register these route-level component
    <Routes>
      {/* render a specific component when it matches this specific route by path and element*/}
      {/* path="/" the end of the path, element is the component to render */}
      <Route path="/" element={<Navigation />}>
        {/* index - mean when you match just slash with nothing on it then should be the Home component  */}
        <Route index={true} element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="contact" element={<ContactForm />} />
      </Route>
    </Routes>
  );
};

export default App;
