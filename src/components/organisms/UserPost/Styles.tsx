import styled from "styled-components";
import { DEVICE } from "../../../Themes/Device";

export const StyledUserPost = styled.div`
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

export const StyledUserPostNone = styled.div`
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
    grid-template-columns: 1fr 1fr;
    grid-gap: 32px 20px;
    align-items: center;
  }
`;

export const StyledPostPrompt = styled.div`
  justify-items: center;
  align-items: center;
  display: grid;

  @media ${DEVICE.laptop} {
    grid-gap: 40px;
  }
`;
