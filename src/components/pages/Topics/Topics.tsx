import { VFC, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { db } from "../../../libs/firebase";

import { Presenter } from "./Presenter";

type PostsType = {
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

export const Topics: VFC = () => {
  const [searchPosts, setSearchPosts] = useState<PostsType[]>([]);
  const [users, setUsers] = useState<UserType[]>([]);
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getPosts = async () => {
    const fetchPosts = await db
      .collection("posts")
      .where("labels", "array-contains", query.get("search"));
    const res = await fetchPosts.get();

    const postData = res.docs.reduce(
      (acc, doc) => [
        //searchPostsをスプレットでコピーしている。から追加されてしまう？
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
      // eslint-disable-next-line
      new Array()
    );

    setSearchPosts(postData);
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

  const extraUser = (
    postUid: string
  ): { uid: string; username: string; avatar: string } | undefined => {
    return users.find((user) => postUid === user.uid);
  };

  return (
    <Presenter
      isLoading={isLoading}
      query={query}
      searchPosts={searchPosts}
      extraUser={extraUser}
    />
  );
};
