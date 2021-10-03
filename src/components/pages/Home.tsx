import { VFC, useState, useEffect, memo } from "react";
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import styled from "styled-components";

import { Article } from "../molecules/Article";
import { db } from "../../firebase";
import { index as LoadingIcon } from "../atom/loading/index";
import { UserNameRegister } from "../organisms/UserNameRegister";
import { selectUser } from "../../features/users/userSlice";
import { COLOR } from "../../Themes/Color";

type POST = {
  uid: string;
  postId: string;
  title: string;
  body: string;
  timestamp: any;
};

export const Home: VFC = memo(() => {
  const user = useSelector(selectUser);
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState<POST[]>([
    {
      uid: "",
      postId: "",
      timestamp: null,
      title: "",
      body: "",
    },
  ]);
  const [users, setUsers] = useState([
    {
      uid: "",
      username: "",
      avatar: "",
    },
  ]);

  useEffect(() => {
    const getPosts = async () => {
      await db
        .collection("posts")
        .get()
        .then((snapshot) => {
          setPosts(
            snapshot.docs.map((doc) => ({
              postId: doc.id,
              uid: doc.data().uid,
              timestamp: doc.data().timestamp.toDate(),
              title: doc.data().title,
              body: doc.data().body,
            }))
          );
        });
    };

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

          setIsLoading(false);
        });
    };

    getPosts();
    getUsers();
  }, []);

  const extraUser = (
    postUid: string
  ): { uid: string; username: string; avatar: string } | undefined => {
    return users.find((user) => postUid === user.uid);
  };

  if (isLoading) {
    return <LoadingIcon width="40" height="40" />;
  }

  return (
    <StyledHomePosts>
      <StyledHomePostsInner>
        {posts.map((post) => (
          <Article
            postId={post.postId}
            uid={post.uid}
            username={extraUser(post.uid)!.username}
            avatar={extraUser(post.uid)!.avatar}
            title={post.title}
            body={post.body}
            timestamp={post.timestamp}
          />
        ))}
        {/* 表示したいのは、ログイン後にuser.displayNameがnullの場合。 */}
        {user.username === null && <UserNameRegister />}
        <Toaster position="bottom-right" reverseOrder={false} />
      </StyledHomePostsInner>
    </StyledHomePosts>
  );
});

const StyledHomePosts = styled.div`
  background-color: ${COLOR.BACKGROUND};
`;

const StyledHomePostsInner = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 0px 20px;
  max-width: 1024px;
  margin: 80px auto;
  padding: 120px 0;
`;
