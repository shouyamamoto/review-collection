import { VFC, useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { selectUser, updateUserProfile } from "../../features/users/userSlice";
import firebase from "firebase/app";
import { storage, db } from "../../firebase";
import { useSelector } from "react-redux";

import { index as Icon } from "../atom/icon/index";
import { PrimaryButton } from "../atom/button/PrimaryButton";
import { ErrorMsg } from "../atom/text/ErrorMsg";
import { InputText } from "../molecules/InputText";
import { InputTextArea } from "../molecules/InputTextArea";

import { COLOR } from "../../Themes/Color";
import styled from "styled-components";

type profile = {
  uid: string;
  avatar: string;
  username: string;
  comment: string;
  githubName: string;
  twitterName: string;
  blogUrl: string;
};

const validations = {
  username: {
    maxLength: 15,
    minLength: 2,
    errorMessage: "※ユーザー名は2文字以上15文字以下にしてください。",
  },
  comment: {
    maxLength: 100,
    errorMessage: "※100文字以下にしてください。",
  },
  blogUrl: {
    minLength: 0,
    regex: /^https?:\/\//,
    errorMessage: "※httpまたはhttpsから始まるURLを入力してください。",
  },
};

const isUserNameValid = (username: string) => {
  return (
    username.length <= validations.username.maxLength &&
    username.length >= validations.username.minLength
  );
};

const isCommentValid = (comment: string) => {
  return comment.length <= validations.comment.maxLength;
};

const isBlogUrlValid = (blogUrl: string) => {
  return (
    validations.blogUrl.minLength === blogUrl.length ||
    validations.blogUrl.regex.test(blogUrl)
  );
};

const isValidCheck = (username: string, comment: string, blogUrl: string) => {
  return (
    isUserNameValid(username) &&
    isCommentValid(comment) &&
    isBlogUrlValid(blogUrl)
  );
};

const uniqueFileName = (file: any) => {
  const S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const N = 16;
  const randomChar = Array.from(crypto.getRandomValues(new Uint32Array(N)))
    .map((n) => S[n % S.length])
    .join("");
  return randomChar + "_" + file.name;
};

export const ProfileEdit: VFC = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const history = useHistory();
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
    if (isValidCheck(username, comment, blogUrl)) {
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
          .ref(`images/${fileName}`)
          .put(e.target.files![0]);
        uploadAvatar.on(
          firebase.storage.TaskEvent.STATE_CHANGED,
          () => {},
          (err) => {
            alert(err.message);
          },
          async () => {
            await storage
              .ref("images")
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
    history.push(`/${user.uid}`);
  };

  return (
    <StyledProfileEditArea>
      <StyledIconWithLabel>
        <Icon src={profile.avatar} width="112" height="112" />
        <StyleLabel>
          変更する
          <StyledHiddenInput type="file" onChange={onChangeImageHandler} />
        </StyleLabel>
      </StyledIconWithLabel>

      <InputText
        placeholder={profile.username}
        text="ユーザ名"
        inputValue={username}
        defaultValue={profile.username}
        onChange={(e) => onChangeInputState(e, setUsername)}
      />
      <ErrorMsg isValid={() => isUserNameValid(username)}>
        {validations.username.errorMessage}
      </ErrorMsg>

      <InputTextArea
        placeholder={profile.comment}
        text="自己紹介"
        inputValue={comment}
        onChange={(e) => onChangeInputState(e, setComment)}
      />
      <ErrorMsg isValid={() => isCommentValid(comment)}>
        {validations.comment.errorMessage}
      </ErrorMsg>

      <InputText
        placeholder={profile.githubName}
        text="GitHubユーザ名"
        inputValue={githubName}
        onChange={(e) => onChangeInputState(e, setGithubName)}
        defaultValue={profile.githubName}
      />

      <InputText
        placeholder={profile.twitterName}
        text="Twitterユーザ名"
        inputValue={twitterName}
        onChange={(e) => onChangeInputState(e, setTwitterName)}
        defaultValue={profile.twitterName}
      />

      <InputText
        placeholder={profile.blogUrl}
        text="自分のサイト名"
        inputValue={blogUrl}
        onChange={(e) => onChangeInputState(e, setBlogUrl)}
        defaultValue={profile.blogUrl}
      />
      <ErrorMsg isValid={() => isBlogUrlValid(blogUrl)}>
        {validations.blogUrl.errorMessage}
      </ErrorMsg>

      <StyledButtonArea>
        <PrimaryButton onClick={onUpdate} disabled={!isSend}>
          更新する
        </PrimaryButton>
      </StyledButtonArea>
    </StyledProfileEditArea>
  );
};

const StyledProfileEditArea = styled.div`
  width: 90%;
  margin: 0 auto;
  padding: 40px 0;
`;

const StyledHiddenInput = styled.input`
  visibility: hidden;
  height: 0;
  width: 0;
`;

const StyledIconWithLabel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyleLabel = styled.label`
  display: inline-block;
  text-align: center;
  padding: 5px 0;
  font-size: 12px;
  color: ${COLOR.GRAY};

  &:hover {
    cursor: pointer;
  }
`;

const StyledButtonArea = styled.div`
  margin-top: 40px;
  text-align: center;
`;
