import styled from "styled-components";
import { DEVICE } from "../../../Themes/Device";

export const StyledArticleDashboard = styled.main`
  width: 90%;
  max-width: 600px;
  margin: 0 auto;
  padding: 40px 0;

  @media ${DEVICE.laptop} {
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    justify-content: flex-start;
    gap: 0 80px;
    width: 80%;
    max-width: 1024px;
    padding: 60px 0;
  }
`;

export const StyledUserPostNone = styled.div`
  width: 100%;
  margin: 0 auto;
  padding-bottom: 40px;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 16px 10px;

  @media ${DEVICE.mobileM} {
    grid-template-columns: 1fr;
  }

  @media ${DEVICE.laptop} {
    width: 100%;
    max-width: 1024px;
    grid-template-columns: 1fr 1fr;
    grid-gap: 32px 20px;
    align-items: center;
    height: 100%;
  }
`;

export const StyledPostPrompt = styled.div`
  justify-items: center;
  align-items: center;
  display: grid;
  grid-gap: 24px;

  @media ${DEVICE.laptop} {
    grid-gap: 40px;
  }
`;

export const StyledUserPostNoneImg = styled.img`
  display: block;
  width: 90%;
  max-width: 400px;
  margin: 0 auto;
`;
