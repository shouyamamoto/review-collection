import styled from "styled-components";
import { COLOR } from "../../../Themes/Color";
import { DEVICE } from "../../../Themes/Device";

export const StyledHomePosts = styled.div`
  background-color: ${COLOR.BACKGROUND};
`;

export const StyledHomePostsInner = styled.div`
  width: 90%;
  margin: 0 auto;
  padding: 40px 0;
  min-height: 70vh;

  @media ${DEVICE.laptop} {
    padding: 60px 0;
    max-width: 1024px;
  }
`;

export const StyledHomePostsArea = styled.ul`
  display: grid;
  grid-template-columns: 1fr;
  margin: 40px auto;
  gap: 10px;

  @media ${DEVICE.mobileM} {
    grid-template-columns: 1fr 1fr;
  }

  @media ${DEVICE.laptop} {
    grid-template-columns: 1fr 1fr 1fr;
    max-width: 1024px;
  }
`;

export const StyledHomeLoadingInner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${COLOR.BACKGROUND};
  min-height: 90vh;
`;
