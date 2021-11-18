import { VFC } from "react";
import { index as Loading } from "../../atom/loading/index";
import { PostButtons } from "../../molecules/PostButtons/PostButtons";
import { PostInputArea } from "../../molecules/PostInputArea/PostInputArea";
import { checkLabelTextLength } from "../../../Themes/Validations";

import { StyledPostArea, StyledUploadIcon, StyledInner } from "./Styles";

type Props = {
  title: string;
  text: string;
  isPreview: boolean;
  isUploading: boolean;
  addLabel: string;
  labels: string[];
  isShow: {
    preview: boolean;
    image: boolean;
    draft: boolean;
    writing: boolean;
    send: boolean;
  };
  addToLabel: () => void;
  removeLabel: (targetLabel: string) => void;
  sendPost: (title: string, text: string) => Promise<void>;
  onClickAddImage: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  onClickSave: () => void;
  onMouseEnter: (target: string) => void;
  setIsPreview: React.Dispatch<React.SetStateAction<boolean>>;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setText: React.Dispatch<React.SetStateAction<string>>;
  setAddLabel: React.Dispatch<React.SetStateAction<string>>;
};

export const Presenter: VFC<Props> = ({
  title,
  text,
  isPreview,
  addToLabel,
  removeLabel,
  addLabel,
  labels,
  sendPost,
  onClickAddImage,
  onClickSave,
  onMouseEnter,
  isShow,
  isUploading,
  setIsPreview,
  setTitle,
  setText,
  setAddLabel,
}) => {
  return (
    <StyledPostArea>
      <StyledInner>
        <PostInputArea
          title={title}
          text={text}
          isPreview={isPreview}
          onChangeTitle={(e) => {
            setTitle(e.target.value);
          }}
          onChangeText={(e) => {
            setText(e.target.value);
          }}
          onChangeLabel={(e) => {
            const newLabel = e.target.value;
            if (!checkLabelTextLength(newLabel)) return;
            setAddLabel(e.target.value);
          }}
          addToLabel={addToLabel}
          removeLabel={removeLabel}
          addLabel={addLabel}
          labels={labels}
        />
        <PostButtons
          title={title}
          text={text}
          onClickPreview={() => setIsPreview(!isPreview)}
          sendPost={sendPost}
          onClickAddImage={onClickAddImage}
          onClickSave={onClickSave}
          onMouseEnter={onMouseEnter}
          isShow={isShow}
        />
      </StyledInner>
      <StyledUploadIcon>
        {isUploading && <Loading width="40" height="40" />}
      </StyledUploadIcon>
    </StyledPostArea>
  );
};
