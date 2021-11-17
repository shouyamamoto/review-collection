import { VFC } from "react";
import { Toaster } from "react-hot-toast";

import { index as LoadingIcon } from "../../atom/loading/index";
import { index as Icon } from "../../atom/icon/index";
import { index as Title } from "../../atom/title/index";
import { UserPost } from "../../organisms/UserPost/UserPost";
import { ProfileArea } from "../../organisms/ProfileArea/ProfileArea";
import { LikedPosts } from "../../organisms/LikedPosts/LikedPosts";
import { Page404 } from "../../pages/Page404/Page404";

import {
  StyledProfileNav,
  StyledLink,
  StyledProfile,
  StyledProfileInner,
  StyledPosts,
  StyledPostInner,
} from "./Styles";

type Props = {
  isLoading: boolean;
  user: {
    uid: string;
    username: string;
    avatar: string;
    comment: string;
    twitterName: string;
    githubName: string;
    blogUrl: string;
    likedPosts: string[];
  };
  isShow: {
    github: boolean;
    twitter: boolean;
    blogUrl: boolean;
  };
  tabList: {
    name: string;
    to: string;
  }[];
  currentNum: number;
  onMouseEnter: (target: string) => void;
  changeActive: (index: number) => void;
  currentUser: {
    uid: string;
    username: string;
    comment: string;
    avatar: string;
    twitterName: string;
    githubName: string;
    blogUrl: string;
    likedPosts: string[];
  };
  query: URLSearchParams;
};

export const Presenter: VFC<Props> = ({
  isLoading,
  user,
  onMouseEnter,
  isShow,
  tabList,
  currentNum,
  changeActive,
  currentUser,
  query,
}) => {
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
            key={tab.to}
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
