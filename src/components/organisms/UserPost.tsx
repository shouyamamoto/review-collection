import { VFC, useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { db } from "../../firebase";
import { selectUser } from "../../features/users/userSlice";
import { Article } from "../molecules/Article";
import { DEVICE } from "../../Themes/Device";

import { index as LoadingIcon } from "../atom/loading/index";
import { PrimaryButton } from "../atom/button/PrimaryButton";
import NonePosts from "../../images/no-post.svg";

type POST = {
  id: string;
  title: string;
  body: string;
  timestamp: any;
};

export const UserPost: VFC = () => {
  const user = useSelector(selectUser);
  const [isLoading, setIsLoading] = useState(true);
  const [userPosts, setUserPosts] = useState<POST[]>([
    {
      id: "",
      timestamp: null,
      title: "",
      body: "",
    },
  ]);
  // const [author, setAuthor] = useState("");

  useEffect(() => {
    const unSub = db
      .collection("posts")
      .where("uid", "==", user.uid)
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setUserPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            timestamp: doc.data().timestamp.toDate(),
            title: doc.data().title,
            body: doc.data().body,
          }))
        );
      });
    setIsLoading(false);
    return () => unSub();
  }, [user.uid]);

  if (isLoading) {
    return <LoadingIcon width="50" height="50" />;
  }

  if (!userPosts[0]) {
    return (
      <StyledUserPostNone>
        <img src={NonePosts} alt="" width="400" />
        <StyledPostPrompt>
          まだ投稿がありません。
          <br />
          レビューしたこと、されたことを書いてみませんか？
          <Link to={`/${user.uid}/draft`}>
            <PrimaryButton>Add Post</PrimaryButton>
          </Link>
        </StyledPostPrompt>
      </StyledUserPostNone>
    );
  }

  return (
    <StyledUserPost>
      {userPosts.map((post) => (
        <Article
          key={post.id}
          username={user.username}
          avatar={user.avatar}
          title={post.title}
          body={post.body}
          timestamp={post.timestamp}
        />
      ))}
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
    width: 60vw;
    max-width: 1024px;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 32px 20px;
  }
`;

const StyledUserPostNone = styled.div`
  width: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 16px 10px;

  @media ${DEVICE.mobileM} {
    grid-template-columns: 1fr 1fr;
  }

  @media ${DEVICE.laptop} {
    width: 60vw;
    max-width: 1024px;
    grid-template-columns: 1fr 1fr;
    grid-gap: 32px 20px;
    align-items: center;
  }
`;

const StyledPostPrompt = styled.div`
  justify-items: center;
  align-items: center;
  display: grid;

  @media ${DEVICE.laptop} {
    grid-gap: 40px;
  }
`;
