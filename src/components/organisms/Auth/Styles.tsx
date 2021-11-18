import styled from "styled-components";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { COLOR } from "../../../Themes/Color";
import { DEVICE } from "../../../Themes/Device";

export const Modal = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

export const ModalMask = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
`;

export const ModalInner = styled.div`
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
  box-shadow: 0 2.5rem 2rem -2rem hsl(200 50% 20% / 40%);

  @media ${DEVICE.tabletL} {
    width: 70vw;
  }
`;

export const StyledModalTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  color: ${COLOR.PRIMARY};
  margin: 32px 0;
`;

export const LoginItem = styled.li`
  &:not(:last-child) {
    padding-bottom: 20px;
  }
`;

export const StyledFaGithub = styled(FaGithub)`
  margin-right: 10px;
`;
export const StyledFaGoogle = styled(FaGoogle)`
  margin-right: 10px;
`;
