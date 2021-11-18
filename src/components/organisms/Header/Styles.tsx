import styled from "styled-components";
import { DEVICE } from "../../../Themes/Device";

export const StyledHeaderInner = styled.nav`
  width: 90%;
  margin: 0 auto;
  max-width: 900px;
  padding: 24px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media ${DEVICE.laptopL} {
    max-width: 1200px;
  }
`;

export const StyledLogo = styled.img`
  width: 200px;

  @media ${DEVICE.laptop} {
    width: 240px;
  }
`;
