import { VFC, useState, useEffect } from "react";
import styled from "styled-components";

import { index as LoadingIcon } from "../atom/loading/index";
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
  labels: string[];
};

type UserType = {
  uid: string;
  username: string;
  avatar: string;
};

export const LikedPosts: VFC<Props> = ({ likedPosts }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState<PostType[]>([
    {
      id: "",
      uid: "",
      title: "",
      body: "",
      timestamp: null,
      likedUsers: [],
      labels: [],
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
    likedPosts.length !== 0 &&
      likedPosts.forEach((postId) => {
        db.collection("posts")
          .doc(postId)
          .get()
          .then((doc) => {
            if (doc.exists) {
              setPosts((prevPosts) => [
                ...prevPosts,
                {
                  id: doc.id,
                  uid: doc.data()!.uid,
                  title: doc.data()!.title,
                  body: doc.data()!.body,
                  timestamp: doc.data()!.timestamp.toDate(),
                  likedUsers: doc.data()!.likedUsers,
                  labels: doc.data()!.labels,
                },
              ]);
            }
          });
      });

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
    setIsLoading(false);
  }, [likedPosts]);

  const extraUser = (
    postUid: string
  ): { uid: string; username: string; avatar: string } | undefined => {
    return users.find((user) => postUid === user.uid);
  };

  if (isLoading) {
    return <LoadingIcon width="50" height="50" />;
  }

  return (
    <StyledLikedPost>
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
              labels={post.labels}
            />
          )
      )}
    </StyledLikedPost>
  );
};

const StyledLikedPost = styled.div`
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
