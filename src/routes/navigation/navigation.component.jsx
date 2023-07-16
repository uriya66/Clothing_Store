import { Fragment } from "react";
import { Outlet } from "react-router-dom";
// hook that allow us to interact from a componnent with Redux store
import { useSelector } from "react-redux";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { selectIsCartOpen } from "../../store/cart/cart.selector";
import { selectCurrentUser } from "../../store/user/user.selector";

import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import { signOutUser } from "../../utils/firebase/firebase.utils";

import {
  NavigationContainer,
  LogoContainer,
  NavLinksContainer,
  NavLink,
} from "./navigation.styles";

const Navigation = () => {
  // get the value of the current user that sign in
  // context hook tell to this component whenever a value inside of this context update then Re-render (useState set value called)

  // useSelctore is a hook that passes a selector function and a selector function is something that essentially extracts off the values that we want from the whole entire Redux store
  // in this way, it's possible to select values of Redux and put them into the components
  const currentUser = useSelector(selectCurrentUser);

  const isCartOpen = useSelector(selectIsCartOpen);

  return (
    // Fragment is useful if we don't want to render some specific HTML element
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrwnLogo className="logo" />
        </LogoContainer>
        <NavLinksContainer>
          <NavLink to="/shop">SHOP</NavLink>
          <NavLink to="/contact">CONTACT</NavLink>

          {/* if currentUser then show SIGN OUT else show SIGN IN */}
          {currentUser ? (
            // styled-components given unique props that can fit into any generated component - as mean render as a span
            <NavLink as="span" onClick={signOutUser}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to="/auth">SIGN IN</NavLink>
          )}
          <CartIcon />
        </NavLinksContainer>
        {/* if it's true so return the last thing (the component CartDropdown)  */}
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
