import { VFC } from "react";
import styled from "styled-components";

import { index } from "../textArea/index";
import { COLOR } from "../../../Themes/Color";
import { DEVICE } from "../../../Themes/Device";

type Props = {
  placeholder?: string;
  inputValue: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isPreview: boolean;
};

type PreviewProps = {
  isPreview: boolean;
};

export const MarkdownTextArea: VFC<Props> = ({
  placeholder,
  inputValue,
  onChange,
  isPreview,
}) => {
  return (
    <StyledTextArea
      onChange={(e) => onChange(e)}
      value={inputValue}
      placeholder={placeholder}
      isPreview={isPreview}
    />
  );
};

const StyledTextArea = styled(index)<PreviewProps>`
  min-height: 50vh;
  min-width: 90vw;
  border: none;
  border-radius: 10px;
  background-color: ${COLOR.WHITE};
  font-size: 16px;
  line-height: 1.8;
  padding: 20px 14px;
  transition: transform 0.3s;
  transform: ${(props) =>
    props.isPreview ? "translateX(-100%)" : "translateX(0)"};

  @media ${DEVICE.laptopL} {
    padding: 28px;
    transform: translateX(0%);
    width: 100%;
    min-width: 50%;
    min-height: 70vh;
    margin-right: 6px;
  }
`;
