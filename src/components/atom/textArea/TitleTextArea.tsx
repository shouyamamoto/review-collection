import { VFC } from "react";
import styled from "styled-components";
import { COLOR } from "../../../Themes/Color";
import { index } from "./index";

type Props = {
  placeholder?: string;
  inputValue: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export const TitleTextArea: VFC<Props> = ({
  placeholder,
  inputValue,
  onChange,
}) => {
  return (
    <StyledTitle
      value={inputValue}
      onChange={(e) => onChange(e)}
      placeholder={placeholder}
    />
  );
};

const StyledTitle = styled(index)`
  line-height: 1.8;
  font-weight: bold;
  margin-bottom: 20px;
  padding: 0 14px;
  background-color: ${COLOR.TRANSPARENT};
  font-size: 20px;
  height: 40px;
  border: none;
`;
