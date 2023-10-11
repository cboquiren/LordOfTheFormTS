import { Component } from "react";
import { ErrorMessage } from "../ErrorMessage";
import { TextClassInput } from "./components/TextClassInput";
import { PhoneClassInput } from "./components/PhoneClassInput";
import {
  isCityInputValid,
  isEmailInputValid,
  isNameValid,
  isPhoneInputValid,
} from "../utils/validations";
import { PhoneInputState, UserInformation } from "../types";
import { capitalize, formatPhoneNumber } from "../utils/transformations";

const firstNameErrorMessage = "First name must be at least 2 characters long";
const lastNameErrorMessage = "Last name must be at least 2 characters long";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "State is Invalid";
const phoneNumberErrorMessage = "Invalid Phone Number";

type FormStateType = {
  isSubmitted: boolean;
  firstNameInput: string;
  lastNameInput: string;
  emailInput: string;
  cityInput: string;
  phoneInput: PhoneInputState;
};

export class ClassForm extends Component<{
  userDataHandler: (validatedData: UserInformation) => void;
}> {
  state: FormStateType = {
    isSubmitted: false,
    firstNameInput: "",
    lastNameInput: "",
    emailInput: "",
    cityInput: "",
    phoneInput: ["", "", "", ""],
  };
  render() {
    const { userDataHandler } = this.props;
    const { isSubmitted, firstNameInput, lastNameInput, emailInput, cityInput, phoneInput } =
      this.state;

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
      this.setState({
        isSubmitted: false,
        firstNameInput: "",
        lastNameInput: "",
        emailInput: "",
        cityInput: "",
        phoneInput: ["", "", "", ""],
      });
    };

    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          this.setState({ isSubmitted: true });
          if (isDataValid) {
            userDataHandler({
              firstName: capitalize(firstNameInput),
              lastName: capitalize(lastNameInput),
              email: emailInput,
              city: capitalize(cityInput),
              phone: formatPhoneNumber(phoneInput),
            });
            formReset();
          } else {
            alert("Bad Input");
          }
        }}
      >
        <u>
          <h3>User Information Form</h3>
        </u>

        {/* first name input */}
        <TextClassInput
          label="First Name"
          inputProps={{
            placeholder: "Bilbo",
            value: firstNameInput,
            onChange: (e) => {
              this.setState({ firstNameInput: e.target.value });
            },
          }}
        />
        <ErrorMessage message={firstNameErrorMessage} show={shouldShowError(isFirstNameValid)} />

        {/* last name input */}
        <TextClassInput
          label="Last Name"
          inputProps={{
            placeholder: "Baggins",
            value: lastNameInput,
            onChange: (e) => {
              this.setState({ lastNameInput: e.target.value });
            },
          }}
        />
        <ErrorMessage message={lastNameErrorMessage} show={shouldShowError(isLastNameValid)} />

        {/* Email Input */}
        <TextClassInput
          label="Email"
          inputProps={{
            placeholder: "bilbo-baggins@adventurehobbit.net",
            value: emailInput,
            onChange: (e) => {
              this.setState({ emailInput: e.target.value });
            },
          }}
        />
        <ErrorMessage message={emailErrorMessage} show={shouldShowError(isEmailValid)} />

        {/* City Input */}
        <TextClassInput
          label="City"
          inputProps={{
            placeholder: "Hobbiton",
            value: cityInput,
            onChange: (e) => {
              this.setState({ cityInput: e.target.value });
            },
          }}
        />
        <ErrorMessage message={cityErrorMessage} show={shouldShowError(isCityValid)} />

        <PhoneClassInput
          phoneNumberInput={phoneInput}
          setPhoneNumberInput={(newPhone) => this.setState({ phoneInput: newPhone })}
        />
        <ErrorMessage message={phoneNumberErrorMessage} show={shouldShowError(isPhoneValid)} />

        <input type="submit" value="Submit" />
      </form>
    );
  }
}
