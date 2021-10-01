import { VFC } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Toaster } from "react-hot-toast";

import { selectUser } from "../../features/users/userSlice";
import { index as Icon } from "../atom/icon/index";
import { index as Title } from "../atom/title/index";
import { UserPost } from "../organisms/UserPost";
import { ProfileArea } from "../organisms/ProfileArea";
import { COLOR } from "../../Themes/Color";
import { DEVICE } from "../../Themes/Device";

export const Profile: VFC = () => {
  const user = useSelector(selectUser);

  return (
    <>
      <StyledProfile>
        <StyledProfileInner>
          <Icon src={user.avatar} width="120" height="120" />
          <ProfileArea
            username={user.username}
            comment={user.comment}
            githubName={user.githubName}
            twitterName={user.twitterName}
            blogUrl={user.blogUrl}
          />
        </StyledProfileInner>
      </StyledProfile>

      <StyledPosts>
        <StyledPostInner>
          <Title headline="h2">Articles</Title>
          <UserPost />
        </StyledPostInner>
      </StyledPosts>

      <Toaster position="bottom-right" reverseOrder={false} />
    </>
  );
};

const StyledProfile = styled.div`
  display: flex;
  align-items: center;
`;

const StyledProfileInner = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: 0 auto;
  justify-content: center;

  @media ${DEVICE.tabletL} {
    flex-direction: row;
    justify-content: space-between;
    padding: 60px;
    max-width: 800px;
    width: 80%;
  }
  @media ${DEVICE.laptop} {
    justify-content: space-around;
  }
`;

const StyledPosts = styled.div`
  background-color: ${COLOR.BACKGROUND};
  padding: 40px 0;
  min-height: 50vh;
  height: 100%;

  @media ${DEVICE.laptop} {
    padding: 60px 0;
  }
`;

const StyledPostInner = styled.div`
  width: 90%;
  margin: 0 auto;
  display: grid;
  grid-gap: 24px;

  @media ${DEVICE.mobileL} {
    max-width: 800px;
    width: 80vw;
  }

  @media ${DEVICE.laptop} {
    width: 60vw;
    max-width: 1024px;
    grid-gap: 40px;
  }
`;
