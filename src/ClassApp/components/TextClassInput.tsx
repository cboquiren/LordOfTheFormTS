import { Component, ComponentProps } from "react";

export class TextClassInput extends Component<{
  label: string;
  inputProps: ComponentProps<"input">;
}> {
  render() {
    const { label, inputProps } = this.props;
    return (
      <div className="input-wrap">
        <label>{label}:</label>
        <input type="text" {...inputProps} />
      </div>
    );
  }
}
