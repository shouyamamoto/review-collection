import styled from "styled-components";
import { BsPencil } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";

import { COLOR } from "../../../Themes/Color";
import { DEVICE } from "../../../Themes/Device";

type IsActive = {
  isActive: number;
};

export const StyledArticleDashboard = styled.div`
  width: 100%;
`;

export const StyledReleaseArticles = styled.ul<IsActive>`
  height: ${(props) => (props.isActive === 0 ? "100%" : "0")};
  z-index: ${(props) => (props.isActive === 0 ? "1" : "0")};
  opacity: ${(props) => (props.isActive === 0 ? "1" : "0")};
  pointer-events: ${(props) => (props.isActive === 0 ? "all" : "none")};
  width: 100%;
`;
export const StyledDraftArticles = styled.ul<IsActive>`
  height: ${(props) => (props.isActive === 1 ? "100%" : "0")};
  z-index: ${(props) => (props.isActive === 1 ? "1" : "0")};
  opacity: ${(props) => (props.isActive === 1 ? "1" : "0")};
  pointer-events: ${(props) => (props.isActive === 1 ? "all" : "none")};
  width: 100%;
`;

export const StyledArticle = styled.li`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px 0;
  padding: 14px 0;

  &:not(:last-child) {
    border-bottom: 1px solid ${COLOR.BACKGROUND};
  }
`;

export const StyledTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
`;

export const StyledTitleInner = styled.h2`
  font-size: 14px;
  width: 100%;

  @media ${DEVICE.laptop} {
    font-size: 16px;
    max-width: 480px;
  }
  @media ${DEVICE.laptopL} {
    max-width: 600px;
  }
`;

export const StyledTimestamp = styled.span`
  font-size: 12px;
  color: ${COLOR.GRAY};
`;

export const StyledIcons = styled.div`
  display: flex;
  gap: 0 10px;
  padding-left: auto;
`;

export const StyledBsPencil = styled(BsPencil)`
  padding: 10px;
  background-color: ${COLOR.BACKGROUND};
  border-radius: 50%;
  transition: all 0.3s;

  &:hover {
    cursor: pointer;
    background-color: ${COLOR.GRAY};
    color: ${COLOR.WHITE};
  }
`;
export const StyledRiDeleteBin6Line = styled(RiDeleteBin6Line)`
  padding: 10px;
  background-color: ${COLOR.BACKGROUND};
  border-radius: 50%;
  transition: all 0.3s;

  &:hover {
    cursor: pointer;
    background-color: ${COLOR.GRAY};
    color: ${COLOR.WHITE};
  }v
`;
