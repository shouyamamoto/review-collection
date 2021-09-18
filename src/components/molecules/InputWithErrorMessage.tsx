import { VFC } from "react";
import { ErrorMsg } from "../atom/text/ErrorMsg";
import { InputText } from "../molecules/InputText";

type Props = {
  placeholder: string;
  text: string;
  inputValue: string;
  defaultValue: string;
  onChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  isValid: () => boolean;
  errorMessage: string;
};

export const InputWithErrorMessage: VFC<Props> = ({
  placeholder,
  text,
  inputValue,
  defaultValue,
  onChange,
  isValid,
  errorMessage,
}) => {
  return (
    <>
      <InputText
        placeholder={placeholder}
        text={text}
        inputValue={inputValue}
        defaultValue={defaultValue}
        onChange={onChange}
      />
      <ErrorMsg isValid={isValid}>{errorMessage}</ErrorMsg>
    </>
  );
};
