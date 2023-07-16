import { FormInputLabel, FormInputStyles, Group } from "./form-input.styles";

const FormInput = ({ label, ...otherProps }) => {
  return (
    <Group>
      <FormInputStyles {...otherProps} />
      {/* if a label exists then render this label */}
      {label && (
        <FormInputLabel
          // pass as a value number - if the number of lengths is zero then this will be falsely
          // else shrink be true inside actual shrink value prop
          shrink={otherProps.value.length}
        >
          {/* label (name) of the input */}
          {label}
        </FormInputLabel>
      )}
    </Group>
  );
};

export default FormInput;
