import { VFC } from "react";
import styled from "styled-components";
import { TwitterShareButton, TwitterIcon } from "react-share";

import { index as Typography } from "../atom/typography/index";
import { SidebarUserProfile } from "../molecules/SidebarUserProfile";
import { DEVICE } from "../../Themes/Device";
import { COLOR } from "../../Themes/Color";

type Props = {
  location: string;
  uid: string;
  avatar: string;
  username: string;
  githubName: string;
  twitterName: string;
  blogUrl: string;
  comment: string;
};

export const Sidebar: VFC<Props> = ({
  location,
  uid,
  avatar,
  username,
  githubName,
  twitterName,
  blogUrl,
  comment,
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
      <StyledSidebarButtons>
        <Typography size="0.8rem">この記事をシェアする</Typography>
        <StyledButtons>
          <TwitterShareButton url={location}>
            <TwitterIcon size="40" round />
          </TwitterShareButton>
        </StyledButtons>
      </StyledSidebarButtons>
    </StyledSidebar>
  );
};

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
  width: 100%;
  background-color: ${COLOR.WHITE};
  border-radius: 10px;
  display: grid;
  gap: 12px;
  padding: 20px;
  box-sizing: border-box;
  text-align: center;
`;

const StyledButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;
