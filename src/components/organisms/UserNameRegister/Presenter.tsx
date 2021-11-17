import { VFC } from "react";

import { index as Logo } from "../../atom/logo/index";
import { RegisterButton } from "../../atom/button/RegisterButton";
import { ErrorMsg } from "../../atom/text/ErrorMsg";
import { InputText } from "../../molecules/InputText";
import { VALIDATIONS } from "../../../Themes/Validations";

import {
  StyledModal,
  StyledModalMask,
  StyledModalInner,
  StyledForm,
  StyledInputArea,
} from "./Styles";

type Props = {
  inputUsername: string;
  isOpenModal: boolean;
  currentUser: {
    uid: string;
    username: string;
    comment: string;
    avatar: string;
    twitterName: string;
    githubName: string;
    blogUrl: string;
    likedPosts: string[];
  };
  updateDisplayName: (e: React.FormEvent<HTMLFormElement>) => void;
  onChangeUsername: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isUserNameValid: () => boolean;
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Presenter: VFC<Props> = ({
  currentUser,
  updateDisplayName,
  onChangeUsername,
  inputUsername,
  isUserNameValid,
  setIsOpenModal,
  isOpenModal,
}) => {
  return (
    <>
      {currentUser.uid && (
        <StyledModal>
          <StyledModalMask />
          <StyledModalInner>
            <StyledForm onSubmit={updateDisplayName}>
              <Logo />
              <StyledInputArea>
                <InputText
                  placeholder=""
                  text="サービス内で使う名前を教えてください"
                  inputValue={inputUsername}
                  onChange={onChangeUsername}
                />
                <ErrorMsg isValid={isUserNameValid}>
                  {VALIDATIONS.username.errorMessage}
                </ErrorMsg>
              </StyledInputArea>
              <RegisterButton
                type="submit"
                onClick={() => setIsOpenModal(!isOpenModal)}
                isUserNameValid={isUserNameValid}
                isOpenModal={isOpenModal}
              >
                登録する
              </RegisterButton>
            </StyledForm>
          </StyledModalInner>
        </StyledModal>
      )}
    </>
  );
};
