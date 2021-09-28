import { VFC } from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import styled from "styled-components";
import { index as CodeBlock } from "../code/index";
import { COLOR } from "../../../Themes/Color";
import { DEVICE } from "../../../Themes/Device";

type Props = {
  isPreview: boolean;
  text: string;
};

type PreviewProps = {
  isPreview: boolean;
};

export const ReactMarkdownArea: VFC<Props> = ({ isPreview, text }) => {
  return (
    <StyledReactMarkdown
      remarkPlugins={[gfm]}
      children={text}
      components={{ code: CodeBlock }}
      className="preview"
      isPreview={isPreview}
    />
  );
};

const StyledReactMarkdown = styled(ReactMarkdown)<PreviewProps>`
  box-sizing: border-box;
  min-width: 90vw;
  display: block;
  border: none;
  border-radius: 10px;
  outline: none;
  background-color: ${COLOR.WHITE};
  font-size: 16px;
  line-height: 1.8;
  padding: 20px 14px;
  resize: none;
  overflow-wrap: break-word;
  transform: ${(props) =>
    props.isPreview ? "translateX(-100%)" : "translateX(0)"};
  height: ${(props) => (props.isPreview ? "100%" : "0")};
  min-height: 50vh;
  transition: transform 0.3s;

  @media ${DEVICE.laptopL} {
    padding: 28px;
    width: 100%;
    min-width: 50%;
    height: 100%;
    min-height: 70vh;
  }
`;
