import { VFC } from "react";
import styled from "styled-components";
import { COLOR } from "../../../Themes/Color";

type Props = {
  placeholder?: string;
  inputValue: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export const index: VFC<Props> = ({ placeholder, inputValue, onChange }) => {
  return (
    <StyledTextArea
      value={inputValue}
      onChange={(e) => onChange(e)}
      placeholder={placeholder}
    />
  );
};

const StyledTextArea = styled.textarea`
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
