import { VFC } from "react";
import { selectUser } from "../../features/users/userSlice";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { COLOR } from "../../Themes/Color";
import { index as Icon } from "../atom/icon/index";
import { SocialIcons } from "../molecules/SocialIcons";
import { DEVICE } from "../../Themes/Device";

export const Profile: VFC = () => {
  const user = useSelector(selectUser);

  return (
    <>
      <StyledProfile>
        <StyledProfileInner>
          <Icon src={user.avatar} width="120" height="120" />
          <StyledProfileDesc>
            <StyledName>{user.username}</StyledName>
            <StyledIntro>
              <StyledIntro>{user.comment}</StyledIntro>
            </StyledIntro>
            <SocialIcons />
          </StyledProfileDesc>
        </StyledProfileInner>
      </StyledProfile>

      <StyledPosts></StyledPosts>
    </>
  );
};

const StyledProfileDesc = styled.div`
  margin: 14px 0;
  @media ${DEVICE.tabletL} {
    width: 75%;
    max-width: 900px;
  }
`;

const StyledProfile = styled.div`
  display: flex;
  align-items: center;
`;

const StyledProfileInner = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: 0 auto;
  height: 320px;
  justify-content: center;

  @media ${DEVICE.tabletL} {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 280px;
    max-width: 800px;
    width: 80%;
  }
  @media ${DEVICE.laptop} {
    justify-content: space-around;
  }
`;

const StyledIntro = styled.p`
  font-size: 14px;
  margin-bottom: 14px;

  @media ${DEVICE.laptop} {
    font-size: 16px;
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

const StyledPosts = styled.div`
  background-color: ${COLOR.BACKGROUND};
  height: 1000px;
`;
