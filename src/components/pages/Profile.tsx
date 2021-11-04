import { useState, useEffect, VFC } from "react";
import styled from "styled-components";
import { Toaster } from "react-hot-toast";
import { Link, useParams, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectUser } from "../../features/users/userSlice";
import { index as LoadingIcon } from "../atom/loading/index";
import { index as Icon } from "../atom/icon/index";
import { index as Title } from "../atom/title/index";
import { UserPost } from "../organisms/UserPost";
import { ProfileArea } from "../organisms/ProfileArea";
import { LikedPosts } from "../organisms/LikedPosts";
import { Page404 } from "../pages/Page404";
import { db } from "../../libs/firebase";
import { COLOR } from "../../Themes/Color";
import { DEVICE } from "../../Themes/Device";

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

type tabProps = {
  isActive: boolean;
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
      await db
        .collection("users")
        .where("uid", "==", userId)
        .get()
        .then((docs) => {
          if (!docs.empty) {
            docs.forEach((doc) => {
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
        });
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

  if (isLoading) {
    return (
      <StyledProfile>
        <LoadingIcon width="40" height="40" />
      </StyledProfile>
    );
  }

  if (user.uid === "") {
    return <Page404 />;
  }

  return (
    <main>
      <StyledProfile>
        <StyledProfileInner>
          <Icon src={user.avatar} width="120" height="120" />
          <ProfileArea
            username={user.username}
            comment={user.comment}
            githubName={user.githubName}
            twitterName={user.twitterName}
            blogUrl={user.blogUrl}
            onMouseEnter={onMouseEnter}
            isShow={isShow}
          />
        </StyledProfileInner>
      </StyledProfile>

      <StyledProfileNav>
        {tabList.map((tab, index) => (
          <StyledLink
            to={tab.to}
            isActive={currentNum === index}
            onClick={() => changeActive(index)}
          >
            {tab.name === "Articles" && tab.name}
            {tab.name === "Likes" && currentUser.uid === user.uid && tab.name}
          </StyledLink>
        ))}
      </StyledProfileNav>

      <StyledPosts>
        <StyledPostInner>
          {query.get("contents") === "likes" ? (
            <>
              <Title headline="h2">Likes</Title>
              <LikedPosts likedPosts={user.likedPosts} />
            </>
          ) : (
            <>
              <Title headline="h2">Articles</Title>
              <UserPost
                uid={user.uid}
                username={user.username}
                avatar={user.avatar}
              />
            </>
          )}
        </StyledPostInner>
      </StyledPosts>

      <Toaster position="bottom-right" reverseOrder={false} />
    </main>
  );
};

const StyledProfileNav = styled.div`
  width: 90%;
  margin: 0 auto;
  display: flex;
  gap: 24px;

  @media ${DEVICE.tabletL} {
    max-width: 1024px;
    width: 80%;
  }
`;

const StyledLink = styled(Link)<tabProps>`
  font-weight: bold;
  padding-bottom: 4px;
  color: ${(props) => (props.isActive ? `${COLOR.BLACK}` : `${COLOR.GRAY}`)};
  border-bottom: ${(props) =>
    props.isActive ? `2px solid ${COLOR.BLACK}` : "none"};
`;

const StyledProfile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledProfileInner = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: 0 auto;
  justify-content: center;

  @media ${DEVICE.tabletL} {
    flex-direction: row;
    justify-content: space-between;
    padding: 60px;
    max-width: 800px;
    width: 80%;
  }
  @media ${DEVICE.laptop} {
    justify-content: space-around;
  }
`;

const StyledPosts = styled.div`
  background-color: ${COLOR.BACKGROUND};
  padding: 40px 0;
  min-height: 50vh;

  @media ${DEVICE.laptop} {
    padding: 60px 0 120px;
  }
`;

const StyledPostInner = styled.div`
  width: 90%;
  margin: 0 auto;
  display: grid;
  grid-gap: 24px;

  @media ${DEVICE.mobileL} {
    max-width: 800px;
    width: 80vw;
  }

  @media ${DEVICE.laptop} {
    width: 100%;
    max-width: 1024px;
    grid-gap: 40px;
  }
`;
