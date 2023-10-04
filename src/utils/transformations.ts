import { PhoneInputState } from "../FunctionalApp/FunctionalApp";

export const capitalize = (input: string) => {
    return input.split(' ').map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase()).join(' ');
}

export const formatPhoneNumber = (phone:PhoneInputState) => {
    return phone.join('-');
}