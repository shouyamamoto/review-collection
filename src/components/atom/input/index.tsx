import { VFC } from "react";
import styled from "styled-components";
import { COLOR } from "../../../Themes/Color";

type Props = {
  placeholder?: string;
  inputValue: string;
  defaultValue?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const index: VFC<Props> = ({
  placeholder,
  inputValue,
  defaultValue,
  onChange,
}) => {
  return (
    <StyledInput
      type="text"
      value={inputValue}
      onChange={(e) => onChange(e)}
      autoComplete="off"
    />
  );
};

const StyledInput = styled.input`
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 24%);
  padding: 10px 20px;
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
