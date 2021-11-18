import { VFC } from "react";

import { PrimaryButton } from "../../atom/button/PrimaryButton";
import { IconWithLabel } from "../../molecules/IconWithLabel/IconWithLabel";
import { InputText } from "../../molecules/InputText/InputText";
import { InputWithErrorMessage } from "../../molecules/InputWithErrorMessage/InputWithErrorMessage";
import { TextAreaWithErrorMessage } from "../../molecules/TextAreaWithErrorMessage/TextAreaWithErrorMessage";

import {
  VALIDATIONS,
  isUserNameValid,
  isCommentValid,
  isBlogUrlValid,
} from "../../../Themes/Validations";

import {
  StyledEditArea,
  StyledInputArea,
  StyledIconArea,
  StyledButtonArea,
  StyledInputWrap,
} from "./Styles";

type Props = {
  avatar: string;
  username: string;
  githubName: string;
  twitterName: string;
  blogUrl: string;
  comment: string;
  profile: {
    uid: string;
    avatar: string;
    username: string;
    comment: string;
    githubName: string;
    twitterName: string;
    blogUrl: string;
  };
  isSend: boolean;
  onChangeIconHandler: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => Promise<void>;
  onChangeInputState: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
    setFunction: (e: string) => void
  ) => void;
  onUpdate: () => Promise<void>;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setComment: React.Dispatch<React.SetStateAction<string>>;
  setGithubName: React.Dispatch<React.SetStateAction<string>>;
  setTwitterName: React.Dispatch<React.SetStateAction<string>>;
  setBlogUrl: React.Dispatch<React.SetStateAction<string>>;
};

export const Presenter: VFC<Props> = ({
  avatar,
  onChangeIconHandler,
  profile,
  username,
  githubName,
  twitterName,
  blogUrl,
  comment,
  onChangeInputState,
  onUpdate,
  isSend,
  setUsername,
  setComment,
  setGithubName,
  setTwitterName,
  setBlogUrl,
}) => {
  return (
    <StyledEditArea>
      <StyledIconArea>
        <IconWithLabel src={avatar} onChange={onChangeIconHandler} />
      </StyledIconArea>

      <StyledInputArea>
        <StyledInputWrap>
          <InputWithErrorMessage
            placeholder={profile.username}
            text="ユーザ名"
            inputValue={username}
            defaultValue={profile.username}
            onChange={(e) => onChangeInputState(e, setUsername)}
            isValid={() => isUserNameValid(username)}
            errorMessage={VALIDATIONS.username.errorMessage}
          />
        </StyledInputWrap>

        <StyledInputWrap>
          <TextAreaWithErrorMessage
            placeholder={profile.comment}
            text="自己紹介"
            inputValue={comment}
            onChange={(e) => onChangeInputState(e, setComment)}
            isValid={() => isCommentValid(comment)}
            errorMessage={VALIDATIONS.comment.errorMessage}
          />
        </StyledInputWrap>

        <StyledInputWrap>
          <InputText
            placeholder={profile.githubName}
            text="GitHubユーザ名"
            inputValue={githubName}
            onChange={(e) => onChangeInputState(e, setGithubName)}
            defaultValue={profile.githubName}
          />
        </StyledInputWrap>

        <StyledInputWrap>
          <InputText
            placeholder={profile.twitterName}
            text="Twitterユーザ名"
            inputValue={twitterName}
            onChange={(e) => onChangeInputState(e, setTwitterName)}
            defaultValue={profile.twitterName}
          />
        </StyledInputWrap>

        <StyledInputWrap>
          <InputWithErrorMessage
            placeholder={profile.blogUrl}
            text="自分のサイト名"
            inputValue={blogUrl}
            defaultValue={profile.blogUrl}
            onChange={(e) => onChangeInputState(e, setBlogUrl)}
            isValid={() => isBlogUrlValid(blogUrl)}
            errorMessage={VALIDATIONS.blogUrl.errorMessage}
          />
        </StyledInputWrap>
        <StyledButtonArea>
          <PrimaryButton onClick={onUpdate} disabled={!isSend}>
            更新する
          </PrimaryButton>
        </StyledButtonArea>
      </StyledInputArea>
    </StyledEditArea>
  );
};
