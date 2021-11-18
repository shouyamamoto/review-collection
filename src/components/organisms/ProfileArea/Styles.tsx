import styled from "styled-components";
import { DEVICE } from "../../../Themes/Device";

export const StyledProfileDesc = styled.div`
  margin: 14px 0;
  @media ${DEVICE.tabletL} {
    width: 75%;
    max-width: 900px;
  }
`;

export const StyledName = styled.h1`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;

  @media ${DEVICE.laptop} {
    font-size: 24px;
  }
`;
