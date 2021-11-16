import { VFC, useState, useEffect, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import firebase from "firebase";
import { db } from "../../../libs/firebase";
import {
  addLikedPosts,
  removeLikedPosts,
} from "../../../features/users/userSlice";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { Presenter } from "./Presenter";

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
  uid: string;
  avatar: string;
  text: string;
  timestamp: any;
  username: string;
};

export const SinglePostPage: VFC = () => {
  const { currentUser } = useCurrentUser();
  const dispatch = useDispatch();
  const element = useRef<any>(null);
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
  const [comments, setComments] = useState<Comment[]>([]);

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
            uid: doc.data().uid,
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

  return (
    <Presenter
      isLoading={isLoading}
      post={post}
      element={element}
      author={author}
      currentUser={currentUser}
      postId={postId}
      onClickLike={onClickLike}
      count={count}
      onMouseEnter={onMouseEnter}
      isShow={isShow}
      comments={comments}
      location={location}
    />
  );
};
