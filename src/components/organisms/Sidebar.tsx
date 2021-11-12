import { VFC } from "react";
import styled from "styled-components";
import { TwitterShareButton, TwitterIcon } from "react-share";

import { index as Typography } from "../atom/typography/index";
import { SidebarLabels } from "../molecules/SidebarLabels";
import { SidebarUserProfile } from "../molecules/SidebarUserProfile";
import { DEVICE } from "../../Themes/Device";
import noLike from "../../images/no-like.png";
import LikedIcon from "../../images/liked.png";
import { COLOR } from "../../Themes/Color";

type Props = {
  author: {
    uid: string;
    avatar: string;
    username: string;
    githubName: string;
    twitterName: string;
    blogUrl: string;
    comment: string;
  };
  currentUserId: string;
  postId: string;
  location: string;
  likedPosts: string[];
  labels: string[];
  onClickLike: () => void;
  countLikes: number;
  onMouseEnter: (target: string) => void;
  isShow: {
    github: boolean;
    twitter: boolean;
    blogUrl: boolean;
  };
};

export const Sidebar: VFC<Props> = ({
  author,
  currentUserId,
  postId,
  location,
  likedPosts,
  labels,
  onClickLike,
  countLikes,
  onMouseEnter,
  isShow,
}) => {
  return (
    <StyledSidebar>
      <SidebarLabels labels={labels} />
      <SidebarUserProfile
        uid={author.uid}
        avatar={author.avatar}
        username={author.username}
        githubName={author.githubName}
        twitterName={author.twitterName}
        blogUrl={author.blogUrl}
        comment={author.comment}
        onMouseEnter={onMouseEnter}
        isShow={isShow}
      />
      {currentUserId !== "" && (
        <StyledSidebarButtons>
          <TwitterShareButton url={location}>
            <TwitterIcon size="40" round />
          </TwitterShareButton>
          {likedPosts && likedPosts.includes(postId) ? (
            <StyledLikeButton onClick={onClickLike} src={LikedIcon} alt="" />
          ) : (
            <StyledLikeButton onClick={onClickLike} src={noLike} alt="" />
          )}
          <Typography size="12px" color={`${COLOR.GRAY}`}>
            {countLikes}
          </Typography>
        </StyledSidebarButtons>
      )}
    </StyledSidebar>
  );
};

const StyledLikeButton = styled.img`
  width: 40px;
  height: 40px;
  max-width: 40px;
  max-height: 40px;
  margin: 0 auto;

  &:hover {
    cursor: pointer;
  }
`;

const StyledSidebar = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 0 14px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media ${DEVICE.tabletL} {
    padding: 0;
  }
`;

const StyledSidebarButtons = styled.div`
  width: 10%;
  border-radius: 10px;
  display: grid;
  gap: 12px;
  padding: 20px 0;
  box-sizing: border-box;
  text-align: center;
`;
