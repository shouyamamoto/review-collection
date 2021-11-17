import styled from "styled-components";
import { COLOR } from "../../../Themes/Color";
import { DEVICE } from "../../../Themes/Device";

export const StyledModal = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

export const StyledModalMask = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
`;

export const StyledModalInner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${COLOR.WHITE};
  width: 90vw;
  max-width: 600px;
  height: 400px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  @media ${DEVICE.tabletL} {
    width: 70vw;
  }
`;

export const StyledForm = styled.form`
  width: 80%;
`;

export const StyledInputArea = styled.div`
  margin-bottom: 32px;
`;
