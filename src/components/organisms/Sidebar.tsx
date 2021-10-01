import { VFC } from "react";
import styled from "styled-components";
import { DEVICE } from "../../Themes/Device";
import { SidebarUserProfile } from "../molecules/SidebarUserProfile";

type Props = {
  uid: string;
  avatar: string;
  username: string;
  githubName: string;
  twitterName: string;
  blogUrl: string;
  comment: string;
};

export const Sidebar: VFC<Props> = ({
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
    </StyledSidebar>
  );
};

const StyledSidebar = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 0 14px;
  box-sizing: border-box;

  @media ${DEVICE.tabletL} {
    padding: 0;
  }
`;
