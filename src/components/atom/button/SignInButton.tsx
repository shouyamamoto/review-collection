import { VFC } from 'react'
import { StyledButton } from "./index"
import styled from "styled-components"
import { COLOR } from "../../../Themes/Color"

type Props = {
  children: string;
  onClick: () => void;
  icon: any;
}

export const SignInButton:VFC<Props> = ({ children, onClick, icon }) => {
  return (
    <StyledSingInButton onClick={onClick}>{icon}{ children }</StyledSingInButton>
  )
}

const StyledSingInButton = styled(StyledButton)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 14px 40px;
  border: none;
  font-size: 18px;
  font-weight: 400;
  transition: background-color 0.3s, color 0.3s;
  border-radius: 10px;
  background-color: ${COLOR.BACKGROUND};

  &:hover {
    cursor: pointer;
    background-color: ${COLOR.PRIMARY};
    color: ${COLOR.WHITE};
  }
`