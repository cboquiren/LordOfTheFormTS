import { PhoneInputState } from "../types";
import { allCities } from "./all-cities";
import { capitalize } from "./transformations";

export function isEmailInputValid(emailAddress: string) {
    // eslint-disable-next-line no-useless-escape
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return !!emailAddress.match(regex);
}

export function isNameValid(name:string) {
    if (name.length > 2) {
        return name.split('').every(char => char.toLowerCase() !== char.toUpperCase());
    } else {return false}

}

export function isCityInputValid(city:string) {
    return city ? allCities.includes(capitalize(city)) : false;
}

export function isPhoneInputValid(phone:PhoneInputState) {
    return phone.join('').length === 7;
}
