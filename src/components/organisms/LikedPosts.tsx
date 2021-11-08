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
  const [posts, setPosts] = useState<PostType[]>([]);
  const [users, setUsers] = useState<UserType[]>([]);

  useEffect(() => {
    getLikedPosts();
    getUsers();
    setIsLoading(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getLikedPosts = () => {
    likedPosts.forEach(async (postId) => {
      const fetchPost = await db.collection("posts").doc(postId);
      const res = await fetchPost.get();
      if (res.exists) {
        setPosts((prevPosts) => [
          ...prevPosts,
          {
            id: res.id,
            uid: res.data()!.uid,
            title: res.data()!.title,
            body: res.data()!.body,
            timestamp: res.data()!.timestamp.toDate(),
            likedUsers: res.data()!.likedUsers,
            labels: res.data()!.labels,
          },
        ]);
      }
    });
  };

  const getUsers = async () => {
    const fetchUsers = await db.collection("users");
    const res = await fetchUsers.get();
    res.forEach((doc) => {
      setUsers((prevUsers) => [
        ...prevUsers,
        {
          uid: doc.data().uid,
          username: doc.data().username,
          avatar: doc.data().avatar,
        },
      ]);
    });
  };

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
      {posts.map((post) => (
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
      ))}
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
