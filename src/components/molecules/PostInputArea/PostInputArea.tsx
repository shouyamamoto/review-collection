import { VFC } from "react";

import { MarkdownTextArea } from "../../atom/textArea/MarkdownTextArea";
import { ReactMarkdownArea } from "../../atom/reactMarkdown/index";
import { TitleTextArea } from "../../atom/textArea/TitleTextArea";
import { checkLabelLength } from "../../../Themes/Validations";

import {
  StyledTextAreaWrap,
  StyledLabels,
  StyledLabel,
  StyledIoIosCloseCircle,
  StyledInputLabelArea,
  StyledInput,
} from "./Styles";

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
