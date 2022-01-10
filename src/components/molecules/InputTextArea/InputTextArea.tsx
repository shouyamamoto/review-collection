import { memo, VFC } from "react";
import { Index as Label } from "../../atom/label/index";
import { ProfileTextArea } from "../../atom/textArea/ProfileTextArea";

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
        <ProfileTextArea
          placeholder={placeholder}
          inputValue={inputValue}
          onChange={onChange}
        />
      </>
    );
  }
);
