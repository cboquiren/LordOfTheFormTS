import { Component } from "react";
import { ClassForm } from "./ClassForm";
import { UserInformation } from "../types";
import { ProfileInformation } from "../ProfileInformation";
import { PhoneInputState } from "../FunctionalApp/FunctionalApp";
type State = { userInformation: UserInformation | null };

// const defaultUser: UserInformation = {
//   email: "default@default.com",
//   firstName: "Default",
//   lastName: "Default",
//   phone: "1234567",
//   city: "Hobbiton",
// };
/* <Record<string, never>, State>  */

export type userInfoClassPropsType = {
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  phone: PhoneInputState;
};

export class ClassApp extends Component {
  state = {
    firstNameInput: "",
    lastNameInput: "",
    emailInput: "",
    cityInput: "",
    phoneInput: ["", "", "", ""],
    isInfoValid: false,
    userData: { firstName: "", lastName: "", email: "", city: "", phone: "" },
  };
  render() {
    const { firstNameInput, lastNameInput, emailInput, cityInput, phoneInput } = this.state;
    return (
      <>
        <h2>Class</h2>
        <ProfileInformation
          userData={
            // toggle the following lines to change
            // null
            null
          }
        />
        <ClassForm
          userInfoProps={{
            firstName: firstNameInput,
            lastName: lastNameInput,
            email: emailInput,
            city: cityInput,
            phone: phoneInput,
          }}
        />
      </>
    );
  }
}
