import { VFC } from "react";
import { index as Label } from "../atom/label/index";
import { index as Input } from "../atom/input/index";
import styled from "styled-components";

type Props = {
  placeholder?: string;
  text: string;
  inputUsername: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const InputText: VFC<Props> = ({
  placeholder,
  text,
  inputUsername,
  onChange,
}) => {
  return (
    <StyledInputText>
      <Label>{text}</Label>
      <Input
        placeholder={placeholder}
        inputUsername={inputUsername}
        onChange={onChange}
      />
    </StyledInputText>
  );
};

const StyledInputText = styled.div`
  margin-bottom: 14px;
`;
