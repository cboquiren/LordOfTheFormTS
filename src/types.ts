export type UserInformation = {
    firstName: string;
    lastName: string;
    email: string;
    city: string;
    phone: string;
}

export type PhoneInputState = [string, string, string, string];


// export type UserInfoPropsType = {
//   firstName: string;
//   firstNameHandler: (firstNameChange: string) => void;
//   lastName: string;
//   lastNameHandler: (lastNameChange: string) => void;
//   email: string;
//   emailHandler: (emailChange: string) => void;
//   city: string;
//   cityHandler: (cityChange: string) => void;
//   phone: PhoneInputState;
//   phoneHandler: Dispatch<SetStateAction<PhoneInputState>>;
// };