import { VFC } from "react";
import { ErrorMsg } from "../atom/text/ErrorMsg";
import { InputTextArea } from "../molecules/InputTextArea";

type Props = {
  placeholder: string;
  text: string;
  inputValue: string;
  onChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  isValid: () => boolean;
  errorMessage: string;
};

export const TextAreaWithErrorMessage: VFC<Props> = ({
  placeholder,
  text,
  inputValue,
  onChange,
  isValid,
  errorMessage,
}) => {
  return (
    <>
      <InputTextArea
        placeholder={placeholder}
        text={text}
        inputValue={inputValue}
        onChange={onChange}
      />
      <ErrorMsg isValid={isValid}>{errorMessage}</ErrorMsg>
    </>
  );
};
