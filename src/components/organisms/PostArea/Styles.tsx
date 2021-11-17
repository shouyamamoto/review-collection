import styled from "styled-components";
import { COLOR } from "../../../Themes/Color";
import { DEVICE } from "../../../Themes/Device";

export const StyledPostArea = styled.div`
  position: relative;
  background-color: ${COLOR.BACKGROUND};
  min-height: 100vh;
`;

export const StyledUploadIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const StyledInner = styled.div`
  flex: 1;
  width: 90vw;
  margin: 0 auto;
  padding: 40px 0;

  @media ${DEVICE.laptopL} {
    width: 90vw;
    max-width: 1440px;
  }

  @media ${DEVICE.desktop} {
    max-width: 2000px;
  }
`;
