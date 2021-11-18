import styled from "styled-components";
import { DEVICE } from "../../../Themes/Device";

export const StyledIconArea = styled.div`
  position: relative;

  @media ${DEVICE.tabletL} {
    width: 220px;
    display: grid;
    grid-template-columns: auto auto;
    align-items: center;
  }
`;
