import { VFC, useState, useEffect } from "react";
import styled from "styled-components";

import { Article } from "../molecules/Article";
import { db } from "../../libs/firebase";
import { DEVICE } from "../../Themes/Device";

type Props = {
  likedPosts: string[];
};

type PostType = {
  id: string;
  uid: string;
  title: string;
  body: string;
  timestamp: any;
  likedUsers: string[];
};

type UserType = {
  uid: string;
  username: string;
  avatar: string;
};

export const LikedPosts: VFC<Props> = ({ likedPosts }) => {
  const [posts, setPosts] = useState<PostType[]>([
    {
      id: "",
      uid: "",
      title: "",
      body: "",
      timestamp: null,
      likedUsers: [],
    },
  ]);
  const [users, setUsers] = useState<UserType[]>([
    {
      uid: "",
      username: "",
      avatar: "",
    },
  ]);

  useEffect(() => {
    likedPosts.forEach((postId) => {
      db.collection("posts")
        .doc(postId)
        .get()
        .then((doc) => {
          setPosts((prevPosts) => [
            ...prevPosts,
            {
              id: doc.id,
              uid: doc.data()!.uid,
              title: doc.data()!.title,
              body: doc.data()!.body,
              timestamp: doc.data()!.timestamp.toDate(),
              likedUsers: doc.data()!.likedUsers,
            },
          ]);
        });
    });
  }, []);

  useEffect(() => {
    const getUsers = async () => {
      await db
        .collection("users")
        .get()
        .then((snapshot) => {
          setUsers(
            snapshot.docs.map((doc) => ({
              uid: doc.data().uid,
              username: doc.data().username,
              avatar: doc.data().avatar,
            }))
          );
        });
    };
    getUsers();
  }, []);

  const extraUser = (
    postUid: string
  ): { uid: string; username: string; avatar: string } | undefined => {
    return users.find((user) => postUid === user.uid);
  };

  return (
    <StyledUserPost>
      {posts.map(
        (post) =>
          post.id !== "" && (
            <Article
              key={post.id}
              title={post.title}
              postId={post.id}
              body={post.body}
              timestamp={post.timestamp}
              likedUsers={post.likedUsers}
              uid={post.uid}
              username={extraUser(post.uid)?.username}
              avatar={extraUser(post.uid)?.avatar}
            />
          )
      )}
    </StyledUserPost>
  );
};

const StyledUserPost = styled.div`
  width: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 16px 10px;

  @media ${DEVICE.mobileM} {
    grid-template-columns: 1fr 1fr;
  }

  @media ${DEVICE.laptop} {
    width: 100%;
    max-width: 1024px;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 10px 10px;
  }
`;
