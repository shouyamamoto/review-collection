import styled from "styled-components";
import { IoIosCloseCircle } from "react-icons/io";

import { COLOR } from "../../../Themes/Color";
import { DEVICE } from "../../../Themes/Device";

export const StyledTextAreaWrap = styled.div`
  display: flex;
  max-width: 90vw;
  overflow: hidden;
  border-radius: 10px;

  @media ${DEVICE.laptopL} {
    justify-content: space-between;
    max-width: 86vw;
  }
  @media ${DEVICE.desktop} {
    max-width: 1800px;
  }
`;

export const StyledLabels = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px;
  margin-bottom: 20px;
`;

export const StyledLabel = styled.li`
  font-size: 12px;
  background-color: ${COLOR.GRAY};
  color: ${COLOR.WHITE};
  padding: 6px 8px;
  display: inline-block;
  border-radius: 4px;
`;

export const StyledIoIosCloseCircle = styled(IoIosCloseCircle)`
  font-size: 14px;
  margin-left: 4px;

  &:hover {
    cursor: pointer;
  }
`;

export const StyledInputLabelArea = styled.div`
  display: flex;
  gap: 10px;
`;

export const StyledInput = styled.input`
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 24%);
  padding: 4px 10px;
  margin-bottom: 10px;
  display: block;
  width: 400px;
  font-size: 14px;
  outline: none;
  box-sizing: border-box;
  caret-color: ${COLOR.PRIMARY};

  &:focus {
    border: 1px solid ${COLOR.PRIMARY};
  }
`;
