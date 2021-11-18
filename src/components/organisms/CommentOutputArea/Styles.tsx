import styled from "styled-components";
import { RiDeleteBin6Line } from "react-icons/ri";

import { DEVICE } from "../../../Themes/Device";
import { COLOR } from "../../../Themes/Color";

export const StyledCommentWrap = styled.div`
  padding: 0 14px;

  @media ${DEVICE.tabletL} {
    padding: 0;
  }
`;

export const StyledCommentInner = styled.div`
  background-color: ${COLOR.WHITE};
  padding: 40px 20px;
  box-sizing: border-box;
  border-radius: 10px;
  display: grid;
  gap: 40px;

  @media ${DEVICE.tabletL} {
    padding: 40px;
  }
`;

export const StyledComment = styled.div`
  display: grid;
  gap: 10px;
  padding-bottom: 32px;

  &:not(:last-child) {
    border-bottom: 1px solid ${COLOR.BACKGROUND};
  }
`;

export const StyledTimestamp = styled.span`
  font-size: 12px;
  color: ${COLOR.GRAY};
`;

export const StyledRiDeleteBin6Line = styled(RiDeleteBin6Line)`
  padding: 10px;
  background-color: ${COLOR.BACKGROUND};
  border-radius: 50%;
  font-size: 12px;
  transition: all 0.3s;

  &:hover {
    cursor: pointer;
    background-color: ${COLOR.GRAY};
    color: ${COLOR.WHITE};
  }

  @media ${DEVICE.tabletL} {
    font-size: 16px;
  }
`;

export const StyledNameWithIcons = styled.div`
display: flex;
justify-content: space-between;
}
`;

export const StyledIcons = styled.div`
  display: flex;
  gap: 10px;
`;
