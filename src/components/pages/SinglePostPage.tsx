import { VFC, useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import gfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import { Toaster } from "react-hot-toast";
import { format } from "date-fns";

import firebase from "firebase";
import { db } from "../../libs/firebase";
import {
  addLikedPosts,
  removeLikedPosts,
  selectUser,
} from "../../features/users/userSlice";
import { index as CodeBlock } from "../atom/code/index";
import { index as Title } from "../atom/title/index";
import { index as Loading } from "../atom/loading/index";
import { Sidebar } from "../organisms/Sidebar";
import { COLOR } from "../../Themes/Color";
import { DEVICE } from "../../Themes/Device";
import { Page404 } from "./Page404";

type PostType = {
  postId: string;
  uid: string;
  title: string;
  body: string;
  timestamp: any;
};

export const SinglePostPage: VFC = () => {
  const currentUser = useSelector(selectUser);
  const user = db
    .collection("users")
    .where("uid", "==", currentUser?.uid)
    .get();
  const dispatch = useDispatch();
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<PostType>({
    postId: "",
    uid: "",
    title: "",
    body: "",
    timestamp: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const getPostData = async () => {
      const postData = await db.collection("posts").doc(postId);
      postData.get().then((doc) => {
        if (doc.exists) {
          setPost({
            postId: doc.id,
            uid: doc?.data()?.uid,
            title: doc?.data()?.title,
            body: doc?.data()?.body,
            timestamp: doc?.data()?.timestamp,
          });
        } else {
          setIsLoading(false);
          return;
        }
        setIsLoading(false);
      });
    };
    getPostData();
  }, [postId]);

  const hasLikedPosts = (postId: string) => {
    return currentUser.likedPosts.includes(postId);
  };

  console.log(currentUser.likedPosts);

  const onClickLike = () => {
    if (hasLikedPosts(postId)) {
      dispatch(removeLikedPosts({ postId }));
      user.then((snapshot) => {
        snapshot.forEach((doc) => {
          db.collection("users")
            .doc(doc.id)
            .update({
              likedPosts: firebase.firestore.FieldValue.arrayRemove(postId),
            });
        });
      });
    } else {
      dispatch(addLikedPosts({ postId }));
      user.then((snapshot) => {
        snapshot.forEach((doc) => {
          db.collection("users")
            .doc(doc.id)
            .update({
              likedPosts: firebase.firestore.FieldValue.arrayUnion(postId),
            });
        });
      });
    }
  };

  if (isLoading) {
    return <Loading width="60" height="60" />;
  }

  if (post.postId === "") {
    return <Page404 />;
  }

  return (
    <StyledSinglePostPage>
      <StyledTitleWrap>
        <StyledTitleInner>
          <Title headline="h1">{post.title}</Title>
          <StyledTimestamp>
            {format(post.timestamp.toDate(), "yyyy-MM-dd")} に公開
          </StyledTimestamp>
        </StyledTitleInner>
      </StyledTitleWrap>
      <StyledSinglePostPageInner>
        <StyledReactMarkdown
          remarkPlugins={[gfm]}
          children={post.body}
          components={{ code: CodeBlock }}
          className="preview"
        />
        <Sidebar
          postId={postId}
          location={location.pathname}
          uid={currentUser.uid}
          avatar={currentUser.avatar}
          username={currentUser.username}
          githubName={currentUser.githubName}
          twitterName={currentUser.twitterName}
          blogUrl={currentUser.blogUrl}
          comment={currentUser.comment}
          likedPosts={currentUser.likedPosts}
          onClickLike={onClickLike}
        />
      </StyledSinglePostPageInner>
      <Toaster position="bottom-right" reverseOrder={false} />
    </StyledSinglePostPage>
  );
};

const StyledSinglePostPage = styled.main`
  background-color: ${COLOR.BACKGROUND};
  display: grid;
  grid-template-columns: 100%;
  margin: 0 auto;
  width: 100%;
`;

const StyledSinglePostPageInner = styled.div`
  @media ${DEVICE.tabletL} {
    width: 95%;
    margin: 0 auto;
    min-height: 80vh;
  }

  @media ${DEVICE.laptop} {
    display: grid;
    grid-template-columns: 3fr 1fr;
    gap: 0 20px;
    width: 100%;
    max-width: 900px;
  }

  @media ${DEVICE.laptopL} {
    max-width: 1200px;
  }
`;

const StyledReactMarkdown = styled(ReactMarkdown)`
  padding: 60px 14px;
  border-bottom: 1px solid ${COLOR.BACKGROUND};
  background-color: ${COLOR.WHITE};
  margin-bottom: 40px;

  @media ${DEVICE.tabletL} {
    padding: 60px 40px;
    border-radius: 10px;
  }
`;

const StyledTitleWrap = styled.div`
  background-color: ${COLOR.BACKGROUND};
`;

const StyledTitleInner = styled.div`
  padding: 40px 14px 60px;

  @media ${DEVICE.tabletL} {
    padding: 40px 0;
    width: 95%;
    margin: 0 auto;
    text-align: left;
  }

  @media ${DEVICE.laptopL} {
    padding: 80px 0;
    width: 100%;
    max-width: 1200px;
  }
`;

const StyledTimestamp = styled.span`
  font-size: 12px;
  color: ${COLOR.GRAY};
`;
