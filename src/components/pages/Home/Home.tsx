import { VFC, useState, useEffect, memo } from "react";

import { db } from "../../../libs/firebase";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { Presenter } from "./Presenter";

type PostType = {
  uid: string;
  postId: string;
  title: string;
  body: string;
  timestamp: any;
  likedUsers: string[];
  labels: string[];
};

type UserType = {
  uid: string;
  username: string;
  avatar: string;
};

export const Home: VFC = memo(() => {
  const { currentUser } = useCurrentUser();
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState<PostType[]>([]);
  const [users, setUsers] = useState<UserType[]>([]);
  const [oldestId, setOldestId] = useState<string | null>(null);
  const [lastDate, setLastDate] = useState<string | null>(null);

  useEffect(() => {
    getPosts();
    getLast();
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getPosts = async () => {
    let fetchPosts = await db
      .collection("posts")
      .where("status", "==", "release")
      .orderBy("timestamp", "desc");

    if (lastDate) {
      // リストの最後のidと全てのリストの最後のidが同じ場合は追加読み込みしない
      if (oldestId === posts[posts.length - 1].postId) {
        return;
      }
      fetchPosts = fetchPosts.startAfter(lastDate);
    }
    const res = await fetchPosts.limit(18).get();

    const postsData = res.docs.reduce(
      (acc: any, doc: any) => [
        ...acc,
        {
          postId: doc.id,
          uid: doc.data().uid,
          timestamp: doc
            .data({ serverTimestamps: "estimate" })
            .timestamp.toDate(),
          title: doc.data().title,
          body: doc.data().body,
          likedUsers: doc.data().likedUsers,
          labels: doc.data().labels,
        },
      ],
      posts
    );

    setPosts(postsData);
    setLastDate(res.docs[res.docs.length - 1].data().timestamp.toDate());
  };

  const getUsers = async () => {
    const fetchUsers = await db.collection("users");
    const res = await fetchUsers.get();

    const userData = res.docs.reduce(
      (acc, doc) => [
        ...acc,
        {
          uid: doc.data().uid,
          username: doc.data().username,
          avatar: doc.data().avatar,
        },
      ],
      users
    );

    setUsers(userData);
    setIsLoading(false);
  };

  const getLast = async () => {
    const fetchPosts = await db.collection("posts").orderBy("timestamp", "asc");
    const res = await fetchPosts.limit(1).get();
    setOldestId(res.docs[0].id);
  };

  const extraUser = (
    postUid: string
  ): { uid: string; username: string; avatar: string } | undefined => {
    return users.find((user) => postUid === user.uid);
  };

  return (
    <Presenter
      isLoading={isLoading}
      getPosts={getPosts}
      oldestId={oldestId}
      posts={posts}
      extraUser={extraUser}
      currentUser={currentUser}
    />
  );
});
