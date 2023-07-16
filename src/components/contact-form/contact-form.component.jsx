import { useState } from "react";

import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";

import { ContactContainer } from "./contact-form.styles";

const defaultFormFields = {
  name: "",
  email: "",
  message: "",
};

const ContactForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { name, email, message } = formFields;

  const onSubmit = (event) => {
    event.preventDefault();
    setFormFields("Submitting...");
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleChange = (event) => {
    // target gives us the thing that is emitting the event (in this case is input)
    const { name, value } = event.target;
    // ...formField - spread in this object and then modify one value
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <ContactContainer>
      <h2>Contact Us</h2>
      <form onSubmit={onSubmit}>
        <FormInput
          label="name"
          type="text"
          required
          onChange={handleChange}
          name="name"
          // the value that I want in the input
          value={name}
        />

        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label="message"
          type="text"
          required
          onChange={handleChange}
          name="message"
          value={message}
        />

        <Button type="submit">Send</Button>
      </form>
    </ContactContainer>
  );
};
export default ContactForm;
