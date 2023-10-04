import { ComponentProps } from "react";

export const TextInput = ({
  label,
  inputProps,
}: {
  label: string;
  inputProps: ComponentProps<"input">;
}) => {
  return (
    <div className="input-wrap">
      <label>{label}:</label>
      <input type="text" {...inputProps} />
    </div>
  );
};
