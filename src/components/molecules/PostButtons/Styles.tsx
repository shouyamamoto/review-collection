import styled from "styled-components";
import { DEVICE } from "../../../Themes/Device";

export const StyledButtonWrap = styled.div`
  position: fixed;
  bottom: 20px;
  display: flex;
  justify-content: flex-end;
  gap: 0 20px;
  margin: 0 auto;
  padding: 20px 0;

  @media ${DEVICE.laptopL} {
    top: 160px;
    right: 3%;
    bottom: auto;
    justify-content: flex-start;
    flex-direction: column;
    gap: 14px 0;
  }
`;
