import { VFC, useState, useCallback } from "react";
import { selectUser, updateUserName } from "../../features/users/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { auth, db } from "../../firebase";
import styled from "styled-components";

import { index as Logo } from "../atom/logo/index";
import { RegisterButton } from "../atom/button/RegisterButton";
import { ErrorMsg } from "../atom/text/ErrorMsg";
import { InputText } from "../molecules/InputText";

import { COLOR } from "../../Themes/Color";
import { DEVICE } from "../../Themes/Device";

const userNameValid = {
  maxLength: 15,
  minLength: 2,
  errorMessage: "※ユーザー名は2文字以上15文字以下にしてください。",
};

export const UserNameRegister: VFC = () => {
  const [inputUsername, setInputUsername] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const updateDisplayName = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const currentUser = auth.currentUser;

    currentUser
      ?.updateProfile({
        displayName: inputUsername,
      })
      .then(() => {
        db.collection("users")
          .where("uid", "==", `${user.uid}`)
          .get()
          .then((snapshot) => {
            snapshot.forEach((doc) => {
              db.collection("users").doc(doc.id).update({
                username: inputUsername,
              });
            });
          })
          .then(() => {
            dispatch(
              updateUserName({
                username: inputUsername,
              })
            );
          });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const isUserNameValid = useCallback(() => {
    return (
      inputUsername.length <= userNameValid.maxLength &&
      inputUsername.length >= userNameValid.minLength
    );
  }, [inputUsername]);

  const onChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputUsername(e.target.value);
  };

  return (
    <>
      {user.uid && (
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
                  {userNameValid.errorMessage}
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

const StyledModal = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

const StyledModalMask = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
`;

const StyledModalInner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${COLOR.WHITE};
  width: 90vw;
  max-width: 600px;
  height: 400px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  @media ${DEVICE.tabletL} {
    width: 70vw;
  }
`;

const StyledForm = styled.form`
  width: 80%;
`;

const StyledInputArea = styled.div`
  margin-bottom: 32px;
`;
