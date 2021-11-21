import { Link } from "react-router-dom";
import { FiLogOut, FiUserCheck, FiSearch } from "react-icons/fi";
import { BsPencil } from "react-icons/bs";
import { GrNotes } from "react-icons/gr";
import styled from "styled-components";

import { COLOR } from "../../../Themes/Color";
import { DEVICE } from "../../../Themes/Device";

export const StyledMenu = styled.ul`
  position: absolute;
  top: 60px;
  right: 20px;
  z-index: 9999;
  box-shadow: 0 3px 12px -1px #04253f40;
  border-radius: 10px;
  width: 200px;
  background-color: ${COLOR.WHITE};

  @media ${DEVICE.tabletL} {
    right: 140px;
    width: 240px;
  }
`;

export const StyledMenuItem = styled.li`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 14px;

  &:first-child {
    border-bottom: 1px solid #04253f40;
  }

  &:last-child {
    padding: 14px 10px 14px 20px;
    border-top: 1px solid #04253f40;
  }

  &:hover {
    cursor: pointer;
    background-color: #f1f5f9;
  }
`;

export const StyledLogoutIcon = styled(FiLogOut)`
  padding-right: 10px;
`;
export const StyledUserEditIcon = styled(FiUserCheck)`
  padding-right: 10px;
`;
export const StyledBsPencil = styled(BsPencil)`
  padding-right: 10px;
`;
export const StyledGrNotes = styled(GrNotes)`
  padding-right: 10px;
`;
export const StyledFiSearch = styled(FiSearch)`
  padding-right: 10px;
`;

export const StyledProfileLink = styled(Link)`
  display: block;
  width: 100%;
  padding: 14px 10px 14px 20px;
  color: ${COLOR.BLACK};
  text-decoration: none;
`;
