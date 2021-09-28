import { VFC } from "react";
import styled from "styled-components";
import { index } from "./index";

type Props = {
  placeholder?: string;
  inputValue: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export const ProfileTextArea: VFC<Props> = ({
  placeholder,
  inputValue,
  onChange,
}) => {
  return (
    <StyledTextArea
      value={inputValue}
      onChange={(e) => onChange(e)}
      placeholder={placeholder}
    />
  );
};

export const StyledTextArea = styled(index)`
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 24%);
  padding: 14px 20px;
  font-size: 16px;
`;
