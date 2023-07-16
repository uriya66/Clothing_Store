import {
  BaseButton,
  GoogleSignInButton,
  InvertedButton,
} from "./button.styles";

// different kinds of styling
// BUTTON_TYPE_CLASSES not allowed to pass strings
export const BUTTON_TYPE_CLASSES = {
  // by default
  base: "base",
  google: "google-sign-in",
  inverted: "inverted",
};

// get the buttonType string that render different styles of buttons
// if none is passed so by default is base
const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) =>
  ({
    // directly use this object
    [BUTTON_TYPE_CLASSES.base]: BaseButton,
    [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
    [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
    // return from a special map object buttonType value the specific component
  }[buttonType]);

const Button = ({ children, buttonType, ...otherProps }) => {
  // this component pointing the actual button component to render
  const CustomButton = getButton(buttonType);
  return <CustomButton {...otherProps}>{children}</CustomButton>;
};

export default Button;
