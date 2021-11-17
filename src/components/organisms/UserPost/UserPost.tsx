import { VFC, useState, useEffect } from "react";

import { db } from "../../../libs/firebase";
import { Presenter } from "./Presenter";

type Props = {
  uid: string;
  username: string;
  avatar: string;
};

type PostType = {
  id: string;
  title: string;
  body: string;
  timestamp: any;
  likedUsers: string[];
  labels: string[];
};

export const UserPost: VFC<Props> = ({ uid, username, avatar }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userPosts, setUserPosts] = useState<PostType[]>([]);

  useEffect(() => {
    const unSub = db
      .collection("posts")
      .where("uid", "==", uid)
      .where("status", "==", "release")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setUserPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            timestamp: doc
              .data({ serverTimestamps: "estimate" })
              .timestamp.toDate(),
            title: doc.data().title,
            body: doc.data().body,
            likedUsers: doc.data().likedUsers,
            labels: doc.data().labels,
          }))
        );
        setIsLoading(false);
      });
    return () => unSub();
  }, [uid]);

  return (
    <Presenter
      isLoading={isLoading}
      userPosts={userPosts}
      uid={uid}
      username={username}
      avatar={avatar}
    />
  );
};
