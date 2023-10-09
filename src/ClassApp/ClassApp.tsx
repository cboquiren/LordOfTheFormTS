import { Component } from "react";
import { ClassForm } from "./ClassForm";
import { UserInformation } from "../types";
import { ProfileInformation } from "../ProfileInformation";
import { PhoneInputState } from "../FunctionalApp/FunctionalApp";

// const defaultUser: UserInformation = {
//   email: "default@default.com",
//   firstName: "Default",
//   lastName: "Default",
//   phone: "1234567",
//   city: "Hobbiton",
// };

type ClassState = {
  firstNameInput: string;
  lastNameInput: string;
  emailInput: string;
  cityInput: string;
  phoneInput: PhoneInputState;
  isInfoValid: boolean;
  userData: UserInformation;
};

export class ClassApp extends Component {
  state: ClassState = {
    firstNameInput: "",
    lastNameInput: "",
    emailInput: "",
    cityInput: "",
    phoneInput: ["", "", "", ""],
    isInfoValid: false,
    userData: { firstName: "", lastName: "", email: "", city: "", phone: "" },
  };
  render() {
    const {
      firstNameInput,
      lastNameInput,
      emailInput,
      cityInput,
      phoneInput,
      isInfoValid,
      userData,
    } = this.state;
    return (
      <>
        <h2>Class</h2>
        <ProfileInformation userData={isInfoValid ? userData : null} />
        <ClassForm
          userInfoProps={{
            firstName: firstNameInput,
            firstNameHandler: (firstNameChange) =>
              this.setState({ firstNameInput: firstNameChange }),
            lastName: lastNameInput,
            lastNameHandler: (lastNameChange) => this.setState({ lastNameInput: lastNameChange }),
            email: emailInput,
            emailHandler: (emailChange) => this.setState({ emailInput: emailChange }),
            city: cityInput,
            cityHandler: (cityChange) => this.setState({ cityInput: cityChange }),
            phone: phoneInput,
            phoneHandler: (phoneChange) => this.setState({ phoneInput: phoneChange }),
          }}
          isDataValid={(isValid) => this.setState({ isInfoValid: isValid })}
          userDataHandler={(validatedData) => this.setState({ userData: validatedData })}
        />
      </>
    );
  }
}
