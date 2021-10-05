import { VFC } from "react";
import styled from "styled-components";

import { MarkdownTextArea } from "../atom/textArea/MarkdownTextArea";
import { ReactMarkdownArea } from "../atom/reactMarkdown/index";
import { TitleTextArea } from "../atom/textArea/TitleTextArea";
import { DEVICE } from "../../Themes/Device";

type Props = {
  title: string;
  text: string;
  isPreview: boolean;
  onChangeTitle: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onChangeText: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export const PostInputArea: VFC<Props> = ({
  title,
  text,
  isPreview,
  onChangeTitle,
  onChangeText,
}) => {
  return (
    <>
      <TitleTextArea
        inputValue={title}
        onChange={onChangeTitle}
        placeholder="Title"
      />

      <StyledTextAreaWrap>
        <MarkdownTextArea
          onChange={onChangeText}
          inputValue={text}
          placeholder="マークダウン記法で書いてください"
          isPreview={isPreview}
        />
        <ReactMarkdownArea text={text} isPreview={isPreview} />
      </StyledTextAreaWrap>
    </>
  );
};

const StyledTextAreaWrap = styled.div`
  display: flex;
  max-width: 90vw;
  overflow: hidden;
  border-radius: 10px;

  @media ${DEVICE.laptopL} {
    justify-content: space-between;
    max-width: 1200px;
  }
  @media ${DEVICE.desktop} {
    max-width: 1800px;
  }
`;
