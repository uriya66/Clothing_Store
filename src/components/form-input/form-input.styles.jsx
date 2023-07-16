import styled, { css } from "styled-components";

// encapsulate css inside of the block for use as a variable and inject it into some components
const subColor = "grey";
const mainColor = "black";

const shrinkLabelStyles = css`
  top: -14px;
  font-size: 12px;
  color: ${mainColor};
`;

// form input structure first label
// because needs specifically a way inside of group styles whenever something happens
// we need to pick the things that are going to be targeted later
export const FormInputLabel = styled.label`
  color: ${subColor};
  font-size: 16px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 5px;
  top: 10px;
  transition: 300ms ease all;

  // include though shrinkLabelStyles then utilize a prop called shrink
  // shrink passed as boolean if true then add shrinkLabelStyles
  ${({ shrink }) => shrink && shrinkLabelStyles}
`;

// then we need the input
export const FormInputStyles = styled.input`
  background: none;
  background-color: white;
  color: ${subColor};
  font-size: 18px;
  padding: 10px 10px 10px 5px;
  display: block;
  width: 100%;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid ${subColor};
  margin: 25px 0;

  &:focus {
    outline: none;
  }
  // if the input selected, find the next sibling with form-input-label class then attach shrinkLabel()
  &:focus ~ ${FormInputLabel} {
    ${shrinkLabelStyles};
  }
`;

export const Group = styled.div`
  position: relative;
  margin: 45px 0;

  input[type="password"] {
    letter-spacing: 0.3em;
  }
`;
