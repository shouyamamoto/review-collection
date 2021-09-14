import React, { VFC } from "react";
import styled from "styled-components";
import { COLOR } from "../../../Themes/Color";
import { StyledButton } from "./index";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
};

export const HeaderButton: VFC<Props> = ({ onClick, children }) => {
  return <StyledBtn onClick={onClick}>{children}</StyledBtn>;
};

const StyledBtn = styled(StyledButton)`
  background-color: ${COLOR.PRIMARY};
  border-radius: 0.45rem;
  border: none;
  color: ${COLOR.WHITE};
  padding: 14px 20px;
  font-weight: bold;

  &:hover {
    cursor: pointer;
  }
`;
