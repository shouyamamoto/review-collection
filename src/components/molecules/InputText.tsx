import { VFC, memo } from "react";
import { index as Label } from "../atom/label/index";
import { index as Input } from "../atom/input/index";

type Props = {
  placeholder?: string;
  text: string;
  defaultValue?: string;
  inputValue: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const InputText: VFC<Props> = memo(
  ({ placeholder, text, inputValue, onChange, defaultValue }) => {
    return (
      <>
        <Label>{text}</Label>
        <Input
          placeholder={placeholder}
          inputValue={inputValue}
          onChange={onChange}
          defaultValue={defaultValue}
        />
      </>
    );
  }
);
