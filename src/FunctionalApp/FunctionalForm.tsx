import { ErrorMessage } from "../ErrorMessage";
import { TextInput } from "./components/TextInput";
import { PhoneInput } from "./components/PhoneInput.tsx";
import { UserInfoPropsType } from "./FunctionalApp.tsx";
import { useState } from "react";
import {
  isCityInputValid,
  isEmailInputValid,
  isNameValid,
  isPhoneInputValid,
} from "../utils/validations.ts";
import { UserInformation } from "../types.ts";
import { capitalize, formatPhoneNumber } from "../utils/transformations.ts";

const firstNameErrorMessage = "First name must be at least 2 characters long";
const lastNameErrorMessage = "Last name must be at least 2 characters long";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "City is Invalid";
const phoneNumberErrorMessage = "Invalid Phone Number";

export const FunctionalForm = ({
  userInfoProps,
  isDataValid,
  userDataHandler,
}: {
  userInfoProps: UserInfoPropsType;
  isDataValid: (isValid: boolean) => void;
  userDataHandler: (validatedData: UserInformation) => void;
}) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    firstName,
    firstNameHandler,
    lastName,
    lastNameHandler,
    email,
    emailHandler,
    city,
    cityHandler,
    phone,
    phoneHandler,
  } = userInfoProps;

  const isFirstNameValid = isNameValid(firstName);
  const isLastNameValid = isNameValid(lastName);
  const isEmailValid = isEmailInputValid(email);
  const isCityValid = isCityInputValid(city);
  const isPhoneValid = isPhoneInputValid(phone);

  const validityChecks = [
    isFirstNameValid,
    isLastNameValid,
    isEmailValid,
    isCityValid,
    isPhoneValid,
  ];

  const shouldShowError = (input: boolean) => {
    return isSubmitted && !input;
  };

  const formReset = () => {
    firstNameHandler("");
    lastNameHandler("");
    emailHandler("");
    cityHandler("");
    phoneHandler(["", "", "", ""]);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setIsSubmitted(true);
        if (!validityChecks.includes(false)) {
          isDataValid(true);
          userDataHandler({
            firstName: capitalize(firstName),
            lastName: capitalize(lastName),
            email: email,
            city: capitalize(city),
            phone: formatPhoneNumber(phone),
          });
          setIsSubmitted(false);
          formReset();
        }
      }}
    >
      <u>
        <h3>User Information Form</h3>
      </u>

      {/* first name input */}
      <TextInput
        label="First Name"
        inputProps={{
          placeholder: "Bilbo",
          value: firstName,
          onChange: (e) => {
            firstNameHandler(e.target.value);
          },
        }}
      />
      <ErrorMessage message={firstNameErrorMessage} show={shouldShowError(isFirstNameValid)} />

      {/* last name input */}
      <TextInput
        label="Last Name"
        inputProps={{
          placeholder: "Baggins",
          value: lastName,
          onChange: (e) => {
            lastNameHandler(e.target.value);
          },
        }}
      />
      <ErrorMessage message={lastNameErrorMessage} show={shouldShowError(isLastNameValid)} />

      {/* Email Input */}
      <TextInput
        label="Email"
        inputProps={{
          placeholder: "bilbo-baggins@adventurehobbits.net",
          value: email,
          onChange: (e) => {
            emailHandler(e.target.value);
          },
        }}
      />
      <ErrorMessage message={emailErrorMessage} show={shouldShowError(isEmailValid)} />

      {/* City Input */}
      <TextInput
        label="City"
        inputProps={{
          placeholder: "Hobbiton",
          value: city,
          onChange: (e) => {
            cityHandler(e.target.value);
          },
        }}
      />
      <ErrorMessage message={cityErrorMessage} show={shouldShowError(isCityValid)} />

      <PhoneInput phoneNumberInput={phone} setPhoneNumberInput={phoneHandler} />
      <ErrorMessage message={phoneNumberErrorMessage} show={shouldShowError(isPhoneValid)} />

      <input type="submit" value="Submit" />
    </form>
  );
};
