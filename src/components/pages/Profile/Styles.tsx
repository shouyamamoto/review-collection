import styled from "styled-components";
import { Link } from "react-router-dom";

import { COLOR } from "../../../Themes/Color";
import { DEVICE } from "../../../Themes/Device";

export const StyledProfileNav = styled.div`
  width: 90%;
  margin: 0 auto;
  display: flex;
  gap: 24px;

  @media ${DEVICE.tabletL} {
    max-width: 1024px;
    width: 80%;
  }
`;

export const StyledLink = styled(({ isActive, ...props }) => (
  <Link {...props} />
))`
  font-weight: bold;
  padding-bottom: 4px;
  color: ${(props) => (props.isActive ? `${COLOR.BLACK}` : `${COLOR.GRAY}`)};
  border-bottom: ${(props) =>
    props.isActive ? `2px solid ${COLOR.BLACK}` : "none"};
`;

export const StyledProfile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledProfileInner = styled.div`
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

export const StyledPosts = styled.div`
  background-color: ${COLOR.BACKGROUND};
  padding: 40px 0;
  min-height: 50vh;

  @media ${DEVICE.laptop} {
    padding: 60px 0 120px;
  }
`;

export const StyledPostInner = styled.div`
  width: 90%;
  margin: 0 auto;
  display: grid;
  grid-gap: 24px;

  @media ${DEVICE.mobileL} {
    max-width: 800px;
    width: 90%;
  }
  @media ${DEVICE.tablet} {
    width: 80vw;
  }

  @media ${DEVICE.laptop} {
    width: 100%;
    max-width: 1024px;
    grid-gap: 40px;
  }
`;
