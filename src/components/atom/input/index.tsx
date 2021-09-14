import { VFC } from "react";
import styled from "styled-components";
import { COLOR } from "../../../Themes/Color";

type Props = {
  placeholder?: string;
  inputUsername: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const index: VFC<Props> = ({ placeholder, inputUsername, onChange }) => {
  return (
    <StyledInput
      type="text"
      value={inputUsername}
      onChange={(e) => onChange(e)}
      autoFocus
      autoComplete="off"
      placeholder={placeholder}
    />
  );
};

const StyledInput = styled.input`
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 24%);
  padding: 14px 20px;
  display: block;
  width: 100%;
  font-size: 16px;
  outline: none;
  box-sizing: border-box;
  caret-color: ${COLOR.PRIMARY};

  &:focus {
    border: 1px solid ${COLOR.PRIMARY};
  }
`;
