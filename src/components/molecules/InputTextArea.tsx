import { memo, VFC } from "react";
import { index as Label } from "../atom/label/index";
import { index as TextArea } from "../atom/textArea/index";

type Props = {
  placeholder?: string;
  text: string;
  inputValue: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export const InputTextArea: VFC<Props> = memo(
  ({ placeholder, text, inputValue, onChange }) => {
    return (
      <>
        <Label>{text}</Label>
        <TextArea
          placeholder={placeholder}
          inputValue={inputValue}
          onChange={onChange}
        />
      </>
    );
  }
);
