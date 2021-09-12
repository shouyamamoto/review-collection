import { VFC } from 'react'
import { StyledButton } from "./index"
import styled from "styled-components"
import { COLOR } from "../../../Themes/Color"

type Props = {
  isUserNameValid: () => boolean;
  onClick: () => void;
  isOpenModal: boolean;
  children: string;
  type: "submit" | undefined ; 
}

export const RegisterButton: VFC<Props> = ({ isUserNameValid, onClick, children, type }) => {
  return (
    <StyledRegisterButton type={type} onClick={onClick} disabled={!isUserNameValid()}>{ children }</StyledRegisterButton>
  )
}

const StyledRegisterButton = styled(StyledButton)`
  background-color: ${(props: React.ButtonHTMLAttributes<HTMLButtonElement>) => props.disabled ? COLOR.BACKGROUND : COLOR.PRIMARY};
  color: ${COLOR.WHITE};
  width: 100%;

  &:hover {
    cursor: ${props => props.disabled ? "not-allowed" : "pointer"};
  }
`
