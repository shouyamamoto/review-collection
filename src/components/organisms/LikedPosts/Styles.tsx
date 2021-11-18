import styled from "styled-components";
import { DEVICE } from "../../../Themes/Device";

export const StyledLikedPost = styled.div`
  width: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 16px 10px;

  @media ${DEVICE.mobileM} {
    grid-template-columns: 1fr 1fr;
  }

  @media ${DEVICE.laptop} {
    width: 100%;
    max-width: 1024px;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 10px 10px;
  }
`;
