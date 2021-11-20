import styled from "styled-components";
import { DEVICE } from "../../../Themes/Device";
import { COLOR } from "../../../Themes/Color";

export const StyledTopicsPosts = styled.div`
  background-color: ${COLOR.BACKGROUND};
`;

export const StyledTopicsPostsInner = styled.div`
  width: 90%;
  margin: 0 auto;
  padding: 40px 0;
  min-height: 70vh;

  @media ${DEVICE.laptop} {
    padding: 60px 0;
    max-width: 1024px;
  }
`;

export const StyledPostsArea = styled.div`
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
