import { VFC, useState, useEffect, memo } from "react";
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import styled from "styled-components";

import { Article } from "../molecules/Article";
import { db } from "../../libs/firebase";
import { index as LoadingIcon } from "../atom/loading/index";
import { index as Title } from "../atom/title/index";
import { index as Link } from "../atom/link/index";
import { UserNameRegister } from "../organisms/UserNameRegister";
import { selectUser } from "../../features/users/userSlice";
import { COLOR } from "../../Themes/Color";
import { DEVICE } from "../../Themes/Device";

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
        .where("status", "==", "release")
        .orderBy("timestamp", "desc")
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
    return (
      <StyledHomeLoadingInner>
        <LoadingIcon width="40" height="40" />
      </StyledHomeLoadingInner>
    );
  }

  return (
    <StyledHome>
      <StyledHomePosts>
        <StyledHomePostsInner>
          <Title headline="h1">Articles</Title>
          <StyledHomePostsArea>
            {posts.map((post) => (
              <Article
                key={post.postId}
                postId={post.postId}
                uid={post.uid}
                username={extraUser(post.uid)!.username}
                avatar={extraUser(post.uid)!.avatar}
                title={post.title}
                body={post.body}
                timestamp={post.timestamp}
              />
            ))}
          </StyledHomePostsArea>
        </StyledHomePostsInner>
      </StyledHomePosts>

      {
        /* githubで初回サインインするとdisplayNameがないので、ここで登録させる */
        user.username === null && <UserNameRegister />
      }
      <Toaster position="bottom-right" reverseOrder={false} />
    </StyledHome>
  );
});

const StyledHome = styled.main``;

const StyledHomePosts = styled.div`
  background-color: ${COLOR.BACKGROUND};
`;

const StyledHomePostsInner = styled.div`
  width: 90%;
  margin: 0 auto;
  padding: 40px 0;
  min-height: 70vh;

  @media ${DEVICE.laptop} {
    padding: 60px 0;
    max-width: 1024px;
  }
`;

const StyledHomePostsArea = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  margin: 40px auto;

  @media ${DEVICE.mobileM} {
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }

  @media ${DEVICE.laptop} {
    grid-template-columns: 1fr 1fr 1fr;
    max-width: 1024px;
  }
`;

const StyledHomeLoadingInner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${COLOR.BACKGROUND};
  min-height: 90vh;
`;
