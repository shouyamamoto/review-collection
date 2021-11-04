import { VFC } from "react";
import styled from "styled-components";
import { IoIosCloseCircle } from "react-icons/io";

import { MarkdownTextArea } from "../atom/textArea/MarkdownTextArea";
import { ReactMarkdownArea } from "../atom/reactMarkdown/index";
import { TitleTextArea } from "../atom/textArea/TitleTextArea";

import { checkLabelLength } from "../../Themes/Validations";
import { DEVICE } from "../../Themes/Device";
import { COLOR } from "../../Themes/Color";

type Props = {
  title: string;
  text: string;
  isPreview: boolean;
  onChangeTitle: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onChangeText: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onChangeLabel: (e: React.ChangeEvent<HTMLInputElement>) => void;
  addToLabel: () => void;
  removeLabel: (targetLabel: string) => void;
  addLabel: string;
  labels: string[];
};

export const PostInputArea: VFC<Props> = ({
  title,
  text,
  isPreview,
  onChangeTitle,
  onChangeText,
  onChangeLabel,
  addToLabel,
  addLabel,
  removeLabel,
  labels,
}) => {
  return (
    <>
      <TitleTextArea
        inputValue={title}
        onChange={onChangeTitle}
        placeholder="記事のタイトル（最大50文字）"
      />
      <StyledInputLabelArea>
        <StyledInput
          value={addLabel}
          onChange={onChangeLabel}
          placeholder={
            checkLabelLength(labels)
              ? "ラベルを5つまで追加できます（最大12文字）"
              : "これ以上追加できません"
          }
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addToLabel();
            }
          }}
          disabled={checkLabelLength(labels) ? false : true}
        />
      </StyledInputLabelArea>
      <StyledLabels>
        {labels.map((label, index) => (
          <StyledLabel key={index}>
            {label}
            <StyledIoIosCloseCircle onClick={() => removeLabel(label)} />
          </StyledLabel>
        ))}
      </StyledLabels>
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

const StyledLabels = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px;
  margin-bottom: 20px;
`;

const StyledLabel = styled.li`
  font-size: 12px;
  background-color: ${COLOR.GRAY};
  color: ${COLOR.WHITE};
  padding: 6px 8px;
  display: inline-block;
  border-radius: 4px;
`;

const StyledIoIosCloseCircle = styled(IoIosCloseCircle)`
  font-size: 14px;
  margin-left: 4px;

  &:hover {
    cursor: pointer;
  }
`;

const StyledInputLabelArea = styled.div`
  display: flex;
  gap: 10px;
`;

const StyledInput = styled.input`
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 24%);
  padding: 4px 10px;
  margin-bottom: 10px;
  display: block;
  width: 400px;
  font-size: 14px;
  outline: none;
  box-sizing: border-box;
  caret-color: ${COLOR.PRIMARY};

  &:focus {
    border: 1px solid ${COLOR.PRIMARY};
  }
`;
