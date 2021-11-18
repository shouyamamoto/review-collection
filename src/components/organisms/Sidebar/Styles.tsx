import styled from "styled-components";
import { DEVICE } from "../../../Themes/Device";

export const StyledSidebar = styled.div`
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
  @media ${DEVICE.laptop} {
    position: sticky;
    height: 100vh;
    top: 60px;
  }
`;

export const StyledSidebarButtons = styled.div`
  width: 10%;
  border-radius: 10px;
  display: flex;
  align-items: flex-start;
  gap: 20px;
  padding: 20px 0;
  box-sizing: border-box;
  text-align: center;
`;

export const StyledLikeButton = styled.img`
  width: 40px;
  height: 40px;
  max-width: 40px;
  max-height: 40px;
  margin: 0 auto;

  &:hover {
    cursor: pointer;
  }
`;

export const StyledLikeIconWrap = styled.div`
  display: grid;
  gap: 2px;
`;
