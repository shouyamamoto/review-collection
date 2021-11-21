import { VFC } from "react";
import { TwitterShareButton, TwitterIcon } from "react-share";

import { index as Typography } from "../../atom/typography/index";
import { SidebarLabels } from "../../molecules/SidebarLabels/SidebarLabels";
import { SidebarUserProfile } from "../../molecules/SidebarUserProfile/SidebarUserProfile";
import noLike from "../../../images/no-like.png";
import LikedIcon from "../../../images/liked.png";
import { COLOR } from "../../../Themes/Color";

import {
  StyledSidebar,
  StyledSidebarButtons,
  StyledLikeButton,
  StyledLikeIconWrap,
} from "./Styles";

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

export const Presenter: VFC<Props> = ({
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
          <TwitterShareButton
            url={`https://review-collection-8edce.web.app/${location}`}
          >
            <TwitterIcon size="40" round />
          </TwitterShareButton>
          <StyledLikeIconWrap>
            {likedPosts && likedPosts.includes(postId) ? (
              <StyledLikeButton onClick={onClickLike} src={LikedIcon} alt="" />
            ) : (
              <StyledLikeButton onClick={onClickLike} src={noLike} alt="" />
            )}
            <Typography size="12px" color={`${COLOR.GRAY}`}>
              {countLikes}
            </Typography>
          </StyledLikeIconWrap>
        </StyledSidebarButtons>
      )}
    </StyledSidebar>
  );
};
