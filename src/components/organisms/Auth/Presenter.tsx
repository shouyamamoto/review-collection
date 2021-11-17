import { VFC } from "react";
import firebase from "firebase/app";

import LoginImg from "../../../images/logo.svg";
import { SignInButton } from "../../atom/button/SignInButton";

import { githubProvider, googleProvider } from "../../../libs/firebase";

import {
  Modal,
  ModalMask,
  ModalInner,
  StyledModalTitle,
  LoginItem,
  StyledFaGithub,
  StyledFaGoogle,
} from "./Styles";

type Props = {
  modalHandler: () => void;
  signIn: (
    provider:
      | firebase.auth.GithubAuthProvider
      | firebase.auth.GoogleAuthProvider
  ) => void;
};

export const Presenter: VFC<Props> = ({ modalHandler, signIn }) => {
  return (
    <Modal>
      <ModalMask onClick={modalHandler} />
      <ModalInner>
        <img src={LoginImg} alt="" width="240" />
        <StyledModalTitle>レビューはきっと宝になる。</StyledModalTitle>
        <ul>
          <LoginItem>
            <SignInButton onClick={() => signIn(githubProvider)}>
              <StyledFaGithub />
              Sign in with Github
            </SignInButton>
          </LoginItem>
          <LoginItem>
            <SignInButton onClick={() => signIn(googleProvider)}>
              <StyledFaGoogle />
              Sign in with Google
            </SignInButton>
          </LoginItem>
        </ul>
      </ModalInner>
    </Modal>
  );
};
