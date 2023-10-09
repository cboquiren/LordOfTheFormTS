import { Component } from "react";
import { ErrorMessage } from "../ErrorMessage";
import { TextClassInput } from "./components/TextClassInput";
import { UserInfoPropsType } from "../FunctionalApp/FunctionalApp";
import { PhoneClassInput } from "./components/PhoneClassInput";
import {
  isCityInputValid,
  isEmailInputValid,
  isNameValid,
  isPhoneInputValid,
} from "../utils/validations";
import { UserInformation } from "../types";
import { capitalize, formatPhoneNumber } from "../utils/transformations";

const firstNameErrorMessage = "First name must be at least 2 characters long";
const lastNameErrorMessage = "Last name must be at least 2 characters long";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "State is Invalid";
const phoneNumberErrorMessage = "Invalid Phone Number";

export class ClassForm extends Component<{
  userInfoProps: UserInfoPropsType;
  isDataValid: (isValid: boolean) => void;
  userDataHandler: (validatedData: UserInformation) => void;
}> {
  state = {
    isSubmitted: false,
  };
  render() {
    const { userInfoProps, isDataValid, userDataHandler } = this.props;
    const { isSubmitted } = this.state;
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
          this.setState({ isSubmitted: true });
          if (!validityChecks.includes(false)) {
            isDataValid(true);
            userDataHandler({
              firstName: capitalize(firstName),
              lastName: capitalize(lastName),
              email: email,
              city: capitalize(city),
              phone: formatPhoneNumber(phone),
            });
            this.setState({ isSubmitted: false });
            formReset();
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
            value: firstName,
            onChange: (e) => {
              firstNameHandler(e.target.value);
            },
          }}
        />
        <ErrorMessage message={firstNameErrorMessage} show={shouldShowError(isFirstNameValid)} />

        {/* last name input */}
        <TextClassInput
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
        <TextClassInput
          label="Email"
          inputProps={{
            placeholder: "bilbo-baggins@adventurehobbit.net",
            value: email,
            onChange: (e) => {
              emailHandler(e.target.value);
            },
          }}
        />
        <ErrorMessage message={emailErrorMessage} show={shouldShowError(isEmailValid)} />

        {/* City Input */}
        <TextClassInput
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

        <PhoneClassInput phoneNumberInput={phone} setPhoneNumberInput={phoneHandler} />
        <ErrorMessage message={phoneNumberErrorMessage} show={shouldShowError(isPhoneValid)} />

        <input type="submit" value="Submit" />
      </form>
    );
  }
}
