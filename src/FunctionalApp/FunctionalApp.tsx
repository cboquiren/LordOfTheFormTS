import { ProfileInformation } from "../ProfileInformation";
import { FunctionalForm } from "./FunctionalForm";
import { useState, Dispatch, SetStateAction } from "react";

export type PhoneInputState = [string, string, string, string];
export type UserInfoPropsType = {
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
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    city: "",
    phone: "",
  });

  return (
    <>
      <h2>Functional</h2>
      <ProfileInformation userData={isInfoValid ? userData : null} />
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
        isDataValid={(isValid) => setIsInfoValid(isValid)}
        userDataHandler={(validatedData) => setUserData(validatedData)}
      />
    </>
  );
};
