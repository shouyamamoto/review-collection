import styled from "styled-components";
import { DEVICE } from "../../../Themes/Device";

export const StyledEditArea = styled.div`
  @media ${DEVICE.laptop} {
    display: flex;
    justify-content: space-around;
    width: 70%;
    margin: 0 auto;
    max-width: ${DEVICE.laptop};
  }
`;

export const StyledInputArea = styled.div`
  flex-basis: 50%;
  flex-shrink: 1;
  flex-grow: 2;
  max-width: 800px;
  margin: 0 auto;
`;

export const StyledIconArea = styled.div`
  flex-basis: 20%;
  flex-shrink: 1;
  flex-grow: 1;
`;

export const StyledButtonArea = styled.div`
  margin-top: 40px;
  text-align: center;
`;

export const StyledInputWrap = styled.div`
  margin-bottom: 14px;
`;
