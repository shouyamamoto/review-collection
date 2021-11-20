import styled from "styled-components";

import { COLOR } from "../../../Themes/Color";
import { DEVICE } from "../../../Themes/Device";

export const StyledSidebarLabels = styled.div`
  width: 100%;
  background-color: ${COLOR.WHITE};
  border-radius: 10px;
  display: grid;
  gap: 12px;
  padding: 20px;
  box-sizing: border-box;

  @media ${DEVICE.tablet} {
    padding: 20px 100px;
  }
  @media ${DEVICE.laptop} {
    padding: 20px;
  }
`;

export const StyledLabels = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr;
  background-color: ${COLOR.WHITE};
  border-radius: 10px;
  gap: 12px;
  box-sizing: border-box;
`;

export const StyledLabel = styled.li`
  display: grid;
  place-items: center;
  font-size: 10px;
  text-align: center;
  background-color: ${COLOR.ACCENT};
  color: ${COLOR.WHITE};
  padding: 6px;
  border-radius: 4px;

  &:hover {
    cursor: pointer;
  }
`;
