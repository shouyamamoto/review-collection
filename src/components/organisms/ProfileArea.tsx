import { VFC } from "react";
import styled from "styled-components";
import { DEVICE } from "../../Themes/Device";

import { index as Typography } from "../atom/typography/index";
import { SocialIcons } from "../molecules/SocialIcons";

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

export const ProfileArea: VFC<Props> = ({
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

const StyledProfileDesc = styled.div`
  margin: 14px 0;
  @media ${DEVICE.tabletL} {
    width: 75%;
    max-width: 900px;
  }
`;

const StyledName = styled.h1`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;

  @media ${DEVICE.laptop} {
    font-size: 24px;
  }
`;
