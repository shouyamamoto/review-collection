import styled from "styled-components";
import { COLOR } from "../../../Themes/Color";
import { DEVICE } from "../../../Themes/Device";

export const StyledFooter = styled.footer`
  padding: 80px 0 40px;
  border-top: 1px solid ${COLOR.BACKGROUND};

  @media ${DEVICE.laptop} {
    padding: 60px 0 20px;
  }
`;

export const StyledFooterInner = styled.div`
  width: 90%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px 0;

  @media ${DEVICE.tabletL} {
    width: 70%;
    max-width: 1200px;
    grid-template-columns: 2fr 1fr 1fr;
    gap: 0 40px;
  }
`;

export const StyledUl = styled.ul`
  margin-top: 14px;
`;

export const StyledLi = styled.li`
  margin: 0.6rem 0;
  font-size: 14px;
`;
