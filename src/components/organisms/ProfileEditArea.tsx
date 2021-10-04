import { VFC, useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import firebase from "firebase/app";
import toast from "react-hot-toast";
import styled from "styled-components";

import { selectUser, updateUserProfile } from "../../features/users/userSlice";
import { storage, db } from "../../firebase";
import { PrimaryButton } from "../atom/button/PrimaryButton";
import { IconWithLabel } from "../molecules/IconWithLabel";
import { InputText } from "../molecules/InputText";
import { InputWithErrorMessage } from "../molecules/InputWithErrorMessage";
import { TextAreaWithErrorMessage } from "../molecules/TextAreaWithErrorMessage";
import { DEVICE } from "../../Themes/Device";
import {
  VALIDATIONS,
  isUserNameValid,
  isCommentValid,
  isBlogUrlValid,
  isValidProfile,
} from "../../Themes/Validations";

type profile = {
  uid: string;
  avatar: string;
  username: string;
  comment: string;
  githubName: string;
  twitterName: string;
  blogUrl: string;
};

// firebaseの使用上、同じファイル名のものがあると、先にあるものが削除されてしまう
// ファイル名の先頭にランダムな文字を付与することで上記の問題を防ぐための関数
export const uniqueFileName = (file: any) => {
  const S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const N = 16;
  const randomChar = Array.from(crypto.getRandomValues(new Uint32Array(N)))
    .map((n) => S[n % S.length])
    .join("");
  return randomChar + "_" + file.name;
};

export const ProfileEditArea: VFC = () => {
  const user = useSelector(selectUser);

  const [avatar, setAvatar] = useState(user.avatar);
  const [username, setUsername] = useState(user.username ? user.username : "");
  const [comment, setComment] = useState(user.comment ? user.comment : "");
  const [githubName, setGithubName] = useState(
    user.githubName ? user.githubName : ""
  );
  const [twitterName, setTwitterName] = useState(
    user.twitterName ? user.twitterName : ""
  );
  const [blogUrl, setBlogUrl] = useState(user.blogUrl ? user.blogUrl : "");
  const [profile, setProfile] = useState<profile>({
    uid: "",
    avatar: "",
    username: "",
    comment: "",
    githubName: "",
    twitterName: "",
    blogUrl: "",
  });
  const [isSend, setIsSend] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    db.collection("users")
      .where("uid", "==", `${user.uid}`)
      .get()
      .then((snapshot) =>
        snapshot.forEach((doc) => {
          setProfile({
            uid: doc.data().uid,
            avatar: doc.data().avatar,
            username: doc.data().username,
            comment: doc.data().comment,
            githubName: doc.data().githubName,
            twitterName: doc.data().twitterName,
            blogUrl: doc.data().blogUrl,
          });
        })
      );
  }, [user.uid]);

  useEffect(() => {
    if (isValidProfile(username, comment, blogUrl)) {
      setIsSend(true);
    } else {
      setIsSend(false);
    }
  }, [username, comment, blogUrl]);

  const onChangeInputState = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
    setFunction: (e: string) => void
  ) => {
    setFunction(e.target.value);
  };

  const onChangeImageHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files![0]) {
        const fileName = uniqueFileName(e.target.files![0]);
        const uploadAvatar = storage
          .ref(`avatars/${fileName}`)
          .put(e.target.files![0]);
        uploadAvatar.on(
          firebase.storage.TaskEvent.STATE_CHANGED,
          () => {},
          (err) => {
            alert(err.message);
          },
          async () => {
            await storage
              .ref("avatars")
              .child(fileName)
              .getDownloadURL()
              .then((url) => {
                setAvatar(url);
                e.target.value = "";
              });
          }
        );
      }
    },
    []
  );

  const onUpdate = () => {
    db.collection("users")
      .where("uid", "==", `${user.uid}`)
      .get()
      .then((snapshot) =>
        snapshot.forEach((doc) => {
          db.collection("users")
            .doc(doc.id)
            .update({
              avatar: avatar ? avatar : profile.avatar,
              blogUrl: blogUrl,
              comment: comment,
              githubName: githubName,
              twitterName: twitterName,
              username: username ? username : profile.username,
            });
        })
      );

    dispatch(
      updateUserProfile({
        uid: profile.uid,
        avatar: avatar ? avatar : profile.avatar,
        blogUrl: blogUrl ? blogUrl : profile.blogUrl,
        comment: comment ? comment : profile.comment,
        githubName: githubName ? githubName : profile.githubName,
        twitterName: twitterName ? twitterName : profile.twitterName,
        username: username ? username : profile.username,
      })
    );
    toast.success("プロフィールを更新しました", {
      icon: "👏",
      style: {
        borderRadius: "10px",
      },
    });
  };

  return (
    <StyledEditArea>
      <StyledIconArea>
        <IconWithLabel src={avatar} onChange={onChangeImageHandler} />
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
            defaultValue={profile.comment}
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

const StyledEditArea = styled.div`
  @media ${DEVICE.laptop} {
    display: flex;
    justify-content: space-around;
    width: 70%;
    margin: 0 auto;
    max-width: ${DEVICE.laptop};
  }
`;

const StyledInputArea = styled.div`
  flex-basis: 50%;
  flex-shrink: 1;
  flex-grow: 2;
  max-width: 800px;
  margin: 0 auto;
`;

const StyledIconArea = styled.div`
  flex-basis: 20%;
  flex-shrink: 1;
  flex-grow: 1;
`;

const StyledButtonArea = styled.div`
  margin-top: 40px;
  text-align: center;
`;

const StyledInputWrap = styled.div`
  margin-bottom: 14px;
`;
