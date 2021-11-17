import { VFC } from "react";

import { index as Typography } from "../../atom/typography/index";
import { SocialIcons } from "../../molecules/SocialIcons";

import { StyledProfileDesc, StyledName } from "./Styles";

type Props = {
  username: string;
  comment: string;
  githubName: string;
  twitterName: string;
  blogUrl: string;
  onMouseEnter: (target: string) => void;
  isShow: {
    github: boolean;
    twitter: boolean;
    blogUrl: boolean;
  };
};

export const Presenter: VFC<Props> = ({
  username,
  comment,
  githubName,
  twitterName,
  blogUrl,
  onMouseEnter,
  isShow,
}) => {
  return (
    <StyledProfileDesc>
      <StyledName>{username}</StyledName>
      <Typography size="0.8rem" margin="0 0 14px 0">
        {comment}
      </Typography>
      <SocialIcons
        githubName={githubName}
        twitterName={twitterName}
        blogUrl={blogUrl}
        onMouseEnter={onMouseEnter}
        isShow={isShow}
      />
    </StyledProfileDesc>
  );
};
