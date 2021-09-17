import { VFC, memo } from "react";
import { index as Label } from "../atom/label/index";
import { index as Input } from "../atom/input/index";

type Props = {
  placeholder?: string;
  text: string;
  defaultValue?: string;
  inputUsername: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const InputText: VFC<Props> = memo(
  ({ placeholder, text, defaultValue, inputUsername, onChange }) => {
    return (
      <>
        <Label>{text}</Label>
        <Input
          placeholder={placeholder}
          inputUsername={inputUsername}
          onChange={onChange}
          defaultValue={defaultValue}
        />
      </>
    );
  }
);
