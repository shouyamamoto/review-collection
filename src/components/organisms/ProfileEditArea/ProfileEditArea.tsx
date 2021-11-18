import { VFC, useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import {
  selectUser,
  updateUserProfile,
} from "../../../features/users/userSlice";
import { db, storage } from "../../../libs/firebase";

import { isValidProfile } from "../../../Themes/Validations";
import { uniqueFileName } from "../../../utils/uniqueFileName";
import { toastHandler } from "../../../utils/toast";
import { resizeFile } from "../../../utils/resizeFile";

import { Presenter } from "./Presenter";

type profile = {
  uid: string;
  avatar: string;
  username: string;
  comment: string;
  githubName: string;
  twitterName: string;
  blogUrl: string;
};

export const ProfileEditArea: VFC = () => {
  const user = useSelector(selectUser);
  const [fileName, setFileName] = useState("");
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
    getUser(user.uid);
  }, [user.uid]);

  useEffect(() => {
    if (isValidProfile(username, comment, blogUrl)) {
      setIsSend(true);
    } else {
      setIsSend(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUser = async (uid: string) => {
    const fetchUser = await db.collection("users").where("uid", "==", `${uid}`);
    const res = await fetchUser.get();
    res.forEach((doc) => {
      setProfile({
        uid: doc.data().uid,
        avatar: doc.data().avatar,
        username: doc.data().username,
        comment: doc.data().comment,
        githubName: doc.data().githubName,
        twitterName: doc.data().twitterName,
        blogUrl: doc.data().blogUrl,
      });
    });
  };

  const onChangeInputState = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
    setFunction: (e: string) => void
  ) => {
    setFunction(e.target.value);
  };

  const onChangeIconHandler = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files![0]) {
        const { files } = e.target;
        const reNameFile = uniqueFileName(files![0]);
        const resizeImage = (await resizeFile(files![0], 200, 200)) as string;
        setAvatar(resizeImage);
        setFileName(reNameFile);
      }
    },
    []
  );

  const onUpdate = async () => {
    storage.ref(`avatars/${fileName}`).putString(avatar, "data_url");
    const fetchUser = await db
      .collection("users")
      .where("uid", "==", `${user.uid}`);
    const res = await fetchUser.get();
    res.forEach((doc) => {
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
    });

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
    toastHandler("success", "プロフィールを更新しました");
  };

  return (
    <Presenter
      avatar={avatar}
      profile={profile}
      username={username}
      githubName={githubName}
      twitterName={twitterName}
      blogUrl={blogUrl}
      comment={comment}
      setUsername={setUsername}
      setComment={setComment}
      setGithubName={setGithubName}
      setTwitterName={setTwitterName}
      setBlogUrl={setBlogUrl}
      isSend={isSend}
      onChangeInputState={onChangeInputState}
      onChangeIconHandler={onChangeIconHandler}
      onUpdate={onUpdate}
    />
  );
};
