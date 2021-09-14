import { VFC, useState, useEffect } from "react";
import { db } from "../../firebase";
import { selectUser } from "../../features/users/userSlice";
import { useSelector } from "react-redux";
import { InputText } from "../molecules/InputText";
import { index as Icon } from "../atom/icon/index";

type profile = {
  avatar: string;
  username: string;
  comment: string;
  githubName: string;
  twitterName: string;
  blogURL: string;
};

export const ProfileEdit: VFC = () => {
  const user = useSelector(selectUser);
  const [avatar, setAvatar] = useState<File | string>(user.photoUrl);
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

  const onChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  const onChangeComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };
  const onChangeGithubName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGithubName(e.target.value);
  };
  const onChangeTwitterName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTwitterName(e.target.value);
  };
  const onChangeBlogUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBlogUrl(e.target.value);
  };
  const onChangeImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files![0]) {
      setAvatar(e.target.files![0]);
      e.target.value = "";
    }
  };

  return (
    <>
      <Icon src={profile.avatar} width="120" height="120" />
      <label>
        変更する
        <input type="file" onChange={onChangeImageHandler} />
      </label>
      <InputText
        placeholder={profile.username}
        text="ユーザ名"
        inputUsername={username}
        onChange={onChangeUsername}
      />
      <InputText
        placeholder={profile.comment}
        text="自己紹介"
        inputUsername={comment}
        onChange={onChangeComment}
      />
      <InputText
        placeholder={profile.githubName}
        text="GitHubユーザ名"
        inputUsername={githubName}
        onChange={onChangeGithubName}
      />
      <InputText
        placeholder={profile.twitterName}
        text="Twitterユーザ名"
        inputUsername={twitterName}
        onChange={onChangeTwitterName}
      />
      <InputText
        placeholder={profile.blogURL}
        text="自分のサイト名"
        inputUsername={blogUrl}
        onChange={onChangeBlogUrl}
      />
    </>
  );
};
