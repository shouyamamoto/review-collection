import { VFC } from 'react'
import styled from "styled-components"
import { COLOR } from "../../../Themes/Color"

type Props = {
  inputUsername: string;
  handleChange: (e: string) => void;
}

export const index:VFC<Props> = ({ inputUsername, handleChange }) => {
  return (
    <StyledInput
      type="text"
      value={inputUsername}
      onChange={(e) => handleChange(e.target.value)}
      autoFocus
      autoComplete="off"
    />
  )
}

const StyledInput = styled.input`
  border-radius: 4px;
  border: 1px solid rgba(0,0,0, 24%);
  padding: 14px 20px;
  display: block;
  width: 100%;
  font-size: 16px;
  outline: none;
  box-sizing: border-box;
  caret-color: ${COLOR.PRIMARY};

  &:focus {
    border: 1px solid ${COLOR.PRIMARY};
  }
`