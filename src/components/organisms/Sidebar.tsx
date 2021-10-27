import { VFC } from "react";
import styled from "styled-components";
import { TwitterShareButton, TwitterIcon } from "react-share";

import { index as Typography } from "../atom/typography/index";
import { SidebarUserProfile } from "../molecules/SidebarUserProfile";
import { DEVICE } from "../../Themes/Device";
import noLike from "../../images/no-like.png";
import LikedIcon from "../../images/liked.png";
import { COLOR } from "../../Themes/Color";

type Props = {
  currentUserId: string;
  postId: string;
  location: string;
  uid: string;
  avatar: string;
  username: string;
  githubName: string;
  twitterName: string;
  blogUrl: string;
  comment: string;
  likedPosts: string[];
  onClickLike: () => void;
  countLikes: number;
};

export const Sidebar: VFC<Props> = ({
  currentUserId,
  postId,
  location,
  uid,
  avatar,
  username,
  githubName,
  twitterName,
  blogUrl,
  comment,
  likedPosts,
  onClickLike,
  countLikes,
}) => {
  return (
    <StyledSidebar>
      <SidebarUserProfile
        uid={uid}
        avatar={avatar}
        username={username}
        githubName={githubName}
        twitterName={twitterName}
        blogUrl={blogUrl}
        comment={comment}
      />
      {currentUserId !== "" && (
        <StyledSidebarButtons>
          <TwitterShareButton url={location}>
            <TwitterIcon size="40" round />
          </TwitterShareButton>
          {likedPosts.includes(postId) ? (
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
