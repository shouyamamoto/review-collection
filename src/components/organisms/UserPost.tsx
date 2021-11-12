import { VFC, useState, useEffect } from "react";
import styled from "styled-components";

import { db } from "../../libs/firebase";
import { Article } from "../molecules/Article";
import { DEVICE } from "../../Themes/Device";

import { index as LoadingIcon } from "../atom/loading/index";
import { PrimaryButton } from "../atom/button/PrimaryButton";
import { index as Link } from "../atom/link";
import NonePosts from "../../images/no-post.svg";

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
  const [userPosts, setUserPosts] = useState<PostType[]>([
    {
      id: "",
      timestamp: null,
      title: "",
      body: "",
      likedUsers: [],
      labels: [],
    },
  ]);

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

  if (isLoading) {
    return <LoadingIcon width="50" height="50" />;
  }

  return (
    <>
      {userPosts[0] ? (
        <StyledUserPost>
          {userPosts.map((post) => (
            <Article
              key={post.id}
              postId={post.id}
              uid={uid}
              username={username}
              avatar={avatar}
              title={post.title}
              body={post.body}
              timestamp={post.timestamp}
              likedUsers={post.likedUsers}
              labels={post.labels}
            />
          ))}
        </StyledUserPost>
      ) : (
        <StyledUserPostNone>
          <img src={NonePosts} alt="" width="400" />
          <StyledPostPrompt>
            まだ投稿がありません。
            <br />
            レビューしたこと、されたことを書いてみませんか？
            <Link to={`/articles/new`}>
              <PrimaryButton>Add Post</PrimaryButton>
            </Link>
          </StyledPostPrompt>
        </StyledUserPostNone>
      )}
    </>
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
    width: 100%;
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
