import { VFC, useState, useEffect } from "react";
import { storage, db } from "../../firebase";
import firebase from "firebase/app";
import { selectUser } from "../../features/users/userSlice";
import { useSelector } from "react-redux";
import { InputText } from "../molecules/InputText";
import { index as Icon } from "../atom/icon/index";
import styled from "styled-components";
import { COLOR } from "../../Themes/Color";

type profile = {
  avatar: string;
  username: string;
  comment: string;
  githubName: string;
  twitterName: string;
  blogURL: string;
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
  const [avatar, setAvatar] = useState(user.photoUrl);
  const [username, setUsername] = useState("");
  const [comment, setComment] = useState("");
  const [githubName, setGithubName] = useState("");
  const [twitterName, setTwitterName] = useState("");
  const [blogUrl, setBlogUrl] = useState("");
  const [profile, setProfile] = useState<profile>({
    avatar: "",
    username: "",
    comment: "",
    githubName: "",
    twitterName: "",
    blogURL: "",
  });

  useEffect(() => {
    db.collection("users")
      .where("uid", "==", `${user.uid}`)
      .get()
      .then((snapshot) =>
        snapshot.forEach((doc) => {
          setProfile({
            avatar: doc.data().avatar,
            username: doc.data().username,
            comment: doc.data().comment,
            githubName: doc.data().githubName,
            twitterName: doc.data().twitterName,
            blogURL: doc.data().blogURL,
          });
        })
      );
  }, [user.uid]);

  const onChangeInputState = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFunction: (e: string) => void
  ) => {
    setFunction(e.target.value);
  };

  const onChangeImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  };

  return (
    <StyledProfileEditArea>
      <StyledIconWithLabel>
        <Icon src={avatar ? avatar : profile.avatar} width="112" height="112" />
        <StyleLabel>
          変更する
          <StyledHiddenInput type="file" onChange={onChangeImageHandler} />
        </StyleLabel>
      </StyledIconWithLabel>
      <InputText
        placeholder={profile.username}
        text="ユーザ名"
        inputUsername={username}
        onChange={(e) => onChangeInputState(e, setUsername)}
      />
      <InputText
        placeholder={profile.comment}
        text="自己紹介"
        inputUsername={comment}
        onChange={(e) => onChangeInputState(e, setComment)}
      />
      <InputText
        placeholder={profile.githubName}
        text="GitHubユーザ名"
        inputUsername={githubName}
        onChange={(e) => onChangeInputState(e, setGithubName)}
      />
      <InputText
        placeholder={profile.twitterName}
        text="Twitterユーザ名"
        inputUsername={twitterName}
        onChange={(e) => onChangeInputState(e, setTwitterName)}
      />
      <InputText
        placeholder={profile.blogURL}
        text="自分のサイト名"
        inputUsername={blogUrl}
        onChange={(e) => onChangeInputState(e, setBlogUrl)}
      />
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
