import { ErrorMessage } from "../ErrorMessage";
import { TextInput } from "./components/TextInput";
import { PhoneInput } from "./components/PhoneInput.tsx";
import { useState } from "react";
import {
  isCityInputValid,
  isEmailInputValid,
  isNameValid,
  isPhoneInputValid,
} from "../utils/validations.ts";
import { PhoneInputState, UserInformation } from "../types.ts";
import { capitalize, formatPhoneNumber } from "../utils/transformations.ts";

const firstNameErrorMessage = "First name must be at least 2 characters long";
const lastNameErrorMessage = "Last name must be at least 2 characters long";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "City is Invalid";
const phoneNumberErrorMessage = "Invalid Phone Number";

export const FunctionalForm = ({
  userDataHandler,
}: {
  userDataHandler: (validatedData: UserInformation) => void;
}) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [cityInput, setCityInput] = useState("");
  const [phoneInput, setPhoneInput] = useState<PhoneInputState>(["", "", "", ""]);

  const isFirstNameValid = isNameValid(firstNameInput);
  const isLastNameValid = isNameValid(lastNameInput);
  const isEmailValid = isEmailInputValid(emailInput);
  const isCityValid = isCityInputValid(cityInput);
  const isPhoneValid = isPhoneInputValid(phoneInput);

  const validityChecks = [
    isFirstNameValid,
    isLastNameValid,
    isEmailValid,
    isCityValid,
    isPhoneValid,
  ];

  const isDataValid = validityChecks.every((n) => n);

  const shouldShowError = (input: boolean) => {
    return isSubmitted && !input;
  };

  const formReset = () => {
    setFirstNameInput("");
    setLastNameInput("");
    setCityInput("");
    setEmailInput("");
    setPhoneInput(["", "", "", ""]);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setIsSubmitted(true);
        if (isDataValid) {
          userDataHandler({
            firstName: capitalize(firstNameInput),
            lastName: capitalize(lastNameInput),
            email: emailInput,
            city: capitalize(cityInput),
            phone: formatPhoneNumber(phoneInput),
          });
          setIsSubmitted(false);
          formReset();
        } else {
          alert("Bad Inputs");
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
          value: firstNameInput,
          onChange: (e) => {
            setFirstNameInput(e.target.value);
          },
        }}
      />
      <ErrorMessage message={firstNameErrorMessage} show={shouldShowError(isFirstNameValid)} />

      {/* last name input */}
      <TextInput
        label="Last Name"
        inputProps={{
          placeholder: "Baggins",
          value: lastNameInput,
          onChange: (e) => {
            setLastNameInput(e.target.value);
          },
        }}
      />
      <ErrorMessage message={lastNameErrorMessage} show={shouldShowError(isLastNameValid)} />

      {/* Email Input */}
      <TextInput
        label="Email"
        inputProps={{
          placeholder: "bilbo-baggins@adventurehobbits.net",
          value: emailInput,
          onChange: (e) => {
            setEmailInput(e.target.value);
          },
        }}
      />
      <ErrorMessage message={emailErrorMessage} show={shouldShowError(isEmailValid)} />

      {/* City Input */}
      <TextInput
        label="City"
        inputProps={{
          placeholder: "Hobbiton",
          value: cityInput,
          onChange: (e) => {
            setCityInput(e.target.value);
          },
        }}
      />
      <ErrorMessage message={cityErrorMessage} show={shouldShowError(isCityValid)} />

      <PhoneInput phoneNumberInput={phoneInput} setPhoneNumberInput={setPhoneInput} />
      <ErrorMessage message={phoneNumberErrorMessage} show={shouldShowError(isPhoneValid)} />

      <input type="submit" value="Submit" />
    </form>
  );
};
