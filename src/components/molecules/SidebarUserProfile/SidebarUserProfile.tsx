import { VFC } from "react";

import { index as Icon } from "../../atom/icon/index";
import { Index as Typography } from "../../atom/typography";
import { Index as Link } from "../../atom/link/index";
import { SocialIcons } from "../SocialIcons/SocialIcons";

import { StyledSidebarUserProfile, StyledSidebarAuthor } from "./Styles";

type Props = {
  uid: string;
  avatar: string;
  username: string;
  githubName: string;
  twitterName: string;
  blogUrl: string;
  comment: string;
  onMouseEnter: (target: string) => void;
  isShow: {
    github: boolean;
    twitter: boolean;
    blogUrl: boolean;
  };
};

export const SidebarUserProfile: VFC<Props> = ({
  uid,
  avatar,
  username,
  githubName,
  twitterName,
  blogUrl,
  comment,
  onMouseEnter,
  isShow,
}) => {
  return (
    <StyledSidebarUserProfile>
      <StyledSidebarAuthor>
        <Link to={`/${uid}`}>
          <Icon src={avatar} width="30" height="30" />
        </Link>

        <Link to={`/${uid}`}>
          <Typography size="0.9rem" weight="bold">
            {username}
          </Typography>
        </Link>
      </StyledSidebarAuthor>

      <Typography size="0.8rem">{comment}</Typography>

      <SocialIcons
        githubName={githubName}
        twitterName={twitterName}
        blogUrl={blogUrl}
        onMouseEnter={onMouseEnter}
        isShow={isShow}
      />
    </StyledSidebarUserProfile>
  );
};
