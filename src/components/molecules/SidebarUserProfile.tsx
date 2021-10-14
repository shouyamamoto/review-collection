import { VFC } from "react";
import styled from "styled-components";

import { index as Icon } from "../atom/icon/index";
import { index as Typography } from "../atom/typography";
import { index as Link } from "../atom/link/index";
import { SocialIcons } from "./SocialIcons";
import { COLOR } from "../../Themes/Color";

type Props = {
  uid: string;
  avatar: string;
  username: string;
  githubName: string;
  twitterName: string;
  blogUrl: string;
  comment: string;
};

export const SidebarUserProfile: VFC<Props> = ({
  uid,
  avatar,
  username,
  githubName,
  twitterName,
  blogUrl,
  comment,
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
      />
    </StyledSidebarUserProfile>
  );
};

const StyledSidebarUserProfile = styled.div`
  width: 100%;
  background-color: ${COLOR.WHITE};
  border-radius: 10px;
  display: grid;
  gap: 12px;
  padding: 20px;
  box-sizing: border-box;
`;

const StyledSidebarAuthor = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 14px;
  align-items: center;
  max-width: 220px;
`;
