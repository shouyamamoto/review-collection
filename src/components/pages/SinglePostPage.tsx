import React, { VFC, useState, useEffect } from "react";
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
import { CommentInputArea } from "../organisms/CommentInputArea";
import { COLOR } from "../../Themes/Color";
import { DEVICE } from "../../Themes/Device";
import { Page404 } from "./Page404";
import { IconWithName } from "../molecules/IconWithName";

type PostType = {
  postId: string;
  uid: string;
  title: string;
  body: string;
  timestamp: any;
  likedUsers: string[];
  labels: string[];
};

type AuthorType = {
  uid: string;
  avatar: string;
  username: string;
  githubName: string;
  twitterName: string;
  blogUrl: string;
  comment: string;
  likedPosts: string[];
};

type Comment = {
  id: string;
  avatar: string;
  text: string;
  timestamp: any;
  username: string;
};

export const SinglePostPage: VFC = () => {
  const currentUser = useSelector(selectUser);
  const dispatch = useDispatch();
  const { postId } = useParams<{ postId: string }>();
  const location = useLocation();
  const [post, setPost] = useState<PostType>({
    postId: "",
    uid: "",
    title: "",
    body: "",
    timestamp: "",
    likedUsers: [],
    labels: [],
  });
  const [author, setAuthor] = useState<AuthorType>({
    uid: "",
    avatar: "",
    username: "",
    githubName: "",
    twitterName: "",
    blogUrl: "",
    comment: "",
    likedPosts: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [isShow, setIsShow] = useState({
    github: false,
    twitter: false,
    blogUrl: false,
  });
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "",
      avatar: "",
      text: "",
      timestamp: null,
      username: "",
    },
  ]);

  const fetchedUser = db
    .collection("users")
    .where("uid", "==", currentUser?.uid)
    .get();

  useEffect(() => {
    const getPostData = async () => {
      const postData = await db.collection("posts").doc(postId);
      const doc = await postData.get();
      if (doc.exists) {
        setPost({
          postId: doc.id,
          uid: doc.data()!.uid,
          title: doc.data()!.title,
          body: doc.data()!.body,
          timestamp: doc.data()!.timestamp.toDate(),
          likedUsers: doc.data()!.likedUsers,
          labels: doc.data()!.labels,
        });
      }

      const fetchUser = await db
        .collection("users")
        .where("uid", "==", doc.data()!.uid);
      const res = await fetchUser.get();
      res.forEach((doc) => {
        setAuthor({
          uid: doc.data().uid,
          avatar: doc.data().avatar,
          username: doc.data().username,
          githubName: doc.data().githubName,
          twitterName: doc.data().twitterName,
          blogUrl: doc.data().blogUrl,
          comment: doc.data().comment,
          likedPosts: doc.data().likedPosts,
        });
      });

      setIsLoading(false);
    };
    getPostData();
  }, [postId]);

  useEffect(() => {
    const unSub = db
      .collection("posts")
      .doc(postId)
      .collection("comment")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        setComments(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            avatar: doc.data().avatar,
            text: doc.data().text,
            timestamp: doc
              .data({ serverTimestamps: "estimate" })
              .timestamp.toDate(),
            username: doc.data().username,
          }))
        );
      });
    return () => {
      unSub();
    };
  }, [postId]);

  useEffect(() => {
    setCount(post.likedUsers.length);
  }, [post.likedUsers.length]);

  const hasLikedPosts = (postId: string) => {
    return currentUser.likedPosts.includes(postId);
  };

  const incrementCount = () => {
    setCount((prevCount) => prevCount + 1);
  };
  const decrementCount = () => {
    setCount((prevCount) => prevCount - 1);
  };

  const onClickLike = () => {
    if (hasLikedPosts(postId)) {
      dispatch(removeLikedPosts({ postId }));
      fetchedUser.then((snapshot) => {
        snapshot.forEach((doc) => {
          db.collection("users")
            .doc(doc.id)
            .update({
              likedPosts: firebase.firestore.FieldValue.arrayRemove(postId),
            });
        });
      });
      db.collection("posts")
        .doc(postId)
        .update({
          likedUsers: firebase.firestore.FieldValue.arrayRemove(
            currentUser.uid
          ),
        });
      decrementCount();
    } else {
      dispatch(addLikedPosts({ postId }));
      fetchedUser.then((snapshot) => {
        snapshot.forEach((doc) => {
          db.collection("users")
            .doc(doc.id)
            .update({
              likedPosts: firebase.firestore.FieldValue.arrayUnion(postId),
            });
        });
      });
      db.collection("posts")
        .doc(postId)
        .update({
          likedUsers: firebase.firestore.FieldValue.arrayUnion(currentUser.uid),
        });
      incrementCount();
    }
  };

  const onMouseEnter = (target: string) => {
    setIsShow({
      ...isShow,
      github: target === "github" && !isShow.github,
      twitter: target === "twitter" && !isShow.twitter,
      blogUrl: target === "blogUrl" && !isShow.blogUrl,
    });
  };

  const newComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    db.collection("posts").doc(postId).collection("comment").add({
      avatar: currentUser.avatar,
      text: comment,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      username: currentUser.username,
    });
    setComment("");
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
            {format(post.timestamp, "yyyy-MM-dd")} に公開
          </StyledTimestamp>
        </StyledTitleInner>
      </StyledTitleWrap>
      <StyledSinglePostPageInner>
        <StyledMarkdownContainer>
          <StyledReactMarkdown
            remarkPlugins={[gfm]}
            children={post.body}
            components={{ code: CodeBlock }}
            className="preview"
          />
        </StyledMarkdownContainer>
        <Sidebar
          currentUserId={currentUser.uid}
          postId={postId}
          location={location.pathname}
          uid={author.uid}
          avatar={author.avatar}
          username={author.username}
          githubName={author.githubName}
          twitterName={author.twitterName}
          blogUrl={author.blogUrl}
          comment={author.comment}
          likedPosts={currentUser.likedPosts}
          labels={post.labels}
          onClickLike={onClickLike}
          countLikes={count}
          onMouseEnter={onMouseEnter}
          isShow={isShow}
        />
        <StyledCommentArea>
          <StyledCommentWrap>
            <StyledCommentInner>
              <Title headline="h3">Comment</Title>
              {comments.map((comment) => (
                <StyledComment key={comment.id}>
                  <IconWithName
                    src={comment.avatar}
                    alt={comment.username}
                    width="30"
                    height="30"
                    username={comment.username}
                  />
                  <StyledTimestamp>
                    {format(comment.timestamp, "yyyy-MM-dd")}
                  </StyledTimestamp>
                  <StyledText>{comment.text}</StyledText>
                </StyledComment>
              ))}
            </StyledCommentInner>
          </StyledCommentWrap>
          <CommentInputArea
            newComment={newComment}
            comment={comment}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              setComment(e.target.value);
            }}
          />
        </StyledCommentArea>
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
  padding: 40px 0;
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

const StyledMarkdownContainer = styled.div`
  padding: 0 14px;

  @media ${DEVICE.tabletL} {
    padding: 0;
  }
`;

const StyledReactMarkdown = styled(ReactMarkdown)`
  padding: 60px 14px;
  border-bottom: 1px solid ${COLOR.BACKGROUND};
  background-color: ${COLOR.WHITE};
  margin-bottom: 40px;
  border-radius: 10px;

  @media ${DEVICE.tabletL} {
    padding: 60px 40px;
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
    max-width: 900px;
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

const StyledCommentArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const StyledCommentWrap = styled.div`
  padding: 0 14px;

  @media ${DEVICE.tabletL} {
    padding: 0;
  }
`;

const StyledCommentInner = styled.div`
  background-color: ${COLOR.WHITE};
  padding: 40px 20px;
  box-sizing: border-box;
  border-radius: 10px;
  display: grid;
  gap: 40px;

  @media ${DEVICE.tabletL} {
    padding: 40px;
  }
`;

const StyledComment = styled.div`
  display: grid;
  gap: 10px;
  padding-bottom: 32px;

  &:not(:last-child) {
    border-bottom: 1px solid ${COLOR.BACKGROUND};
  }
`;

const StyledText = styled.p`
  font-size: 15px;
`;
