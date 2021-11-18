import { VFC, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { db, auth } from "../../../libs/firebase";

import { VALIDATIONS } from "../../../Themes/Validations";
import { updateUserName } from "../../../features/users/userSlice";
import { useCurrentUser } from "../../../hooks/useCurrentUser";

import { Presenter } from "./Presenter";

export const UserNameRegister: VFC = () => {
  const { currentUser } = useCurrentUser();
  const [inputUsername, setInputUsername] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);
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
          .where("uid", "==", `${currentUser.uid}`)
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
      inputUsername.length <= VALIDATIONS.username.maxLength &&
      inputUsername.length >= VALIDATIONS.username.minLength
    );
  }, [inputUsername]);

  const onChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputUsername(e.target.value);
  };

  return (
    <Presenter
      currentUser={currentUser}
      updateDisplayName={updateDisplayName}
      onChangeUsername={onChangeUsername}
      inputUsername={inputUsername}
      isUserNameValid={isUserNameValid}
      setIsOpenModal={setIsOpenModal}
      isOpenModal={isOpenModal}
    />
  );
};
