import React, { VFC } from "react";
import { StyledButton } from "./index";
import styled from "styled-components";
import { COLOR } from "../../../Themes/Color";

type Props = {
  children: React.ReactNode;
  onClick: () => void;
};

export const SignInButton: VFC<Props> = ({ children, onClick }) => {
  return <StyledSingInButton onClick={onClick}>{children}</StyledSingInButton>;
};

const StyledSingInButton = styled(StyledButton)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 14px 40px;
  border: none;
  font-size: 14px;
  font-weight: 400;
  transition: background-color 0.3s, color 0.3s;
  border-radius: 10px;
  background-color: ${COLOR.BACKGROUND};

  &:hover {
    cursor: pointer;
    background-color: ${COLOR.PRIMARY};
    color: ${COLOR.WHITE};
  }
`;
