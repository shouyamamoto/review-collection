import { VFC } from 'react'
import styled from "styled-components"

type Props = {
  children: string;
}

export const index:VFC<Props> = ({ children }) => {
  return (
    <StyledLabel>{ children }</StyledLabel>
  )
}

const StyledLabel = styled.label`
  font-size: 16px;
`
