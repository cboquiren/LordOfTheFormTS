import { ProfileInformation } from "../ProfileInformation";
import { UserInformation } from "../types";
import { formatPhoneNumber } from "../utils/transformations";
import { FunctionalForm } from "./FunctionalForm";
import { useState, Dispatch, SetStateAction } from "react";

export type PhoneInputState = [string, string, string, string];
export type UserInfoType = {
  firstName: string;
  firstNameHandler: (firstNameChange: string) => void;
  lastName: string;
  lastNameHandler: (lastNameChange: string) => void;
  email: string;
  emailHandler: (emailChange: string) => void;
  city: string;
  cityHandler: (cityChange: string) => void;
  phone: PhoneInputState;
  phoneHandler: Dispatch<SetStateAction<PhoneInputState>>;
};

export const FunctionalApp = () => {
  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [cityInput, setCityInput] = useState("");
  const [phoneInput, setPhoneInput] = useState<PhoneInputState>(["", "", "", ""]);
  const [isInfoValid, setIsInfoValid] = useState(false);

  const userInfo: UserInformation = {
    firstName: firstNameInput,
    lastName: lastNameInput,
    email: emailInput,
    city: cityInput,
    phone: formatPhoneNumber(phoneInput),
  };
  return (
    <>
      <h2>Functional</h2>
      <ProfileInformation userData={isInfoValid ? userInfo : null} />
      <FunctionalForm
        userInfoProps={{
          firstName: firstNameInput,
          firstNameHandler: (firstNameChange) => setFirstNameInput(firstNameChange),
          lastName: lastNameInput,
          lastNameHandler: (lastNameChange) => setLastNameInput(lastNameChange),
          email: emailInput,
          emailHandler: (emailChange) => setEmailInput(emailChange),
          city: cityInput,
          cityHandler: (cityChange) => setCityInput(cityChange),
          phone: phoneInput,
          phoneHandler: (phoneChange) => setPhoneInput(phoneChange),
        }}
        checkValidity={(isValid) => setIsInfoValid(isValid)}
      />
    </>
  );
};
