import { useState, useEffect, VFC } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectUser } from "../../../features/users/userSlice";
import { db } from "../../../libs/firebase";

import { Presenter } from "./Presenter";

type UserType = {
  uid: string;
  username: string;
  avatar: string;
  comment: string;
  twitterName: string;
  githubName: string;
  blogUrl: string;
  likedPosts: string[];
};

export const Profile: VFC = () => {
  const currentUser = useSelector(selectUser);
  const { userId } = useParams<{ userId: string }>();
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const [isLoading, setIsLoading] = useState(true);
  const [currentNum, setCurrentNum] = useState(0);
  const [user, setUser] = useState<UserType>({
    uid: "",
    username: "",
    avatar: "",
    comment: "",
    twitterName: "",
    githubName: "",
    blogUrl: "",
    likedPosts: [],
  });
  const [isShow, setIsShow] = useState({
    github: false,
    twitter: false,
    blogUrl: false,
  });

  useEffect(() => {
    const getUser = async () => {
      const fetchUsers = await db
        .collection("users")
        .where("uid", "==", userId);
      const res = await fetchUsers.get();
      if (!res.empty) {
        res.forEach((doc) => {
          setUser({
            uid: doc.data().uid,
            username: doc.data().username,
            avatar: doc.data().avatar,
            comment: doc.data().comment,
            twitterName: doc.data().twitterName,
            githubName: doc.data().githubName,
            blogUrl: doc.data().blogUrl,
            likedPosts: doc.data().likedPosts,
          });
        });
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    };
    getUser();
  }, [userId]);

  const tabList = [
    {
      name: "Articles",
      to: `/${user.uid}`,
    },
    {
      name: "Likes",
      to: `/${user.uid}/?contents=likes`,
    },
  ];

  const changeActive = (index: number) => {
    setCurrentNum(index);
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
      user={user}
      onMouseEnter={onMouseEnter}
      isShow={isShow}
      tabList={tabList}
      currentNum={currentNum}
      changeActive={changeActive}
      currentUser={currentUser}
      query={query}
    />
  );
};
