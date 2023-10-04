import { useRef, ChangeEventHandler, Dispatch, SetStateAction } from "react";
import { PhoneInputState } from "../FunctionalApp";

export const PhoneInput = ({
  phoneNumberInput,
  setPhoneNumberInput,
}: {
  phoneNumberInput: PhoneInputState;
  setPhoneNumberInput: Dispatch<SetStateAction<PhoneInputState>>;
}) => {
  const refs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];
  const ref0 = refs[0];
  const ref1 = refs[1];
  const ref2 = refs[2];
  const ref3 = refs[3];

  const createOnChangeHandler =
    (index: 0 | 1 | 2 | 3): ChangeEventHandler<HTMLInputElement> =>
    (e) => {
      const lengths = [2, 2, 2, 1];
      const currentMaxLength = lengths[index];
      const nextRef = refs[index + 1];
      const prevRef = refs[index - 1];
      const value = e.target.value;
      const shouldGoToNextRef = currentMaxLength === value.length && nextRef?.current;
      const shouldGoToPrevRef = value.length === 0 && prevRef;
      const numberOnly = /^\d*$/;

      const newState = phoneNumberInput.map((phoneInput, phoneInputIndex) => {
        if (index === phoneInputIndex) {
          return e.target.value.match(numberOnly) ? e.target.value : "";
        } else {
          return phoneInput;
        }
      }) as PhoneInputState;
      if (shouldGoToNextRef) {
        nextRef.current?.focus();
      }
      if (shouldGoToPrevRef) {
        prevRef.current?.focus();
      }
      setPhoneNumberInput(newState);
    };
  return (
    <div className="input-wrap">
      <label htmlFor="phone">Phone:</label>
      <div id="phone-input-wrap">
        <input
          type="text"
          id="phone-input-1"
          placeholder="55"
          ref={ref0}
          value={phoneNumberInput[0]}
          maxLength={2}
          onChange={createOnChangeHandler(0)}
        />
        -
        <input
          type="text"
          id="phone-input-2"
          placeholder="55"
          ref={ref1}
          value={phoneNumberInput[1]}
          maxLength={2}
          onChange={createOnChangeHandler(1)}
        />
        -
        <input
          type="text"
          id="phone-input-3"
          placeholder="55"
          ref={ref2}
          value={phoneNumberInput[2]}
          maxLength={2}
          onChange={createOnChangeHandler(2)}
        />
        -
        <input
          type="text"
          id="phone-input-4"
          placeholder="55"
          ref={ref3}
          value={phoneNumberInput[3]}
          maxLength={1}
          onChange={createOnChangeHandler(3)}
        />
      </div>
    </div>
  );
};
