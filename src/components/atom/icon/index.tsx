import { VFC } from 'react'
import styled from "styled-components"

type Props = {
  src: string;
  width?: string;
  height?: string;
  onClickMenuHandler?: () => void;
}

export const index:VFC<Props> = ({ src, width, height, onClickMenuHandler }) => {
  return (
    <StyledIcon src={src} alt="" width={width} height={height} onClick={onClickMenuHandler} /> 
  )
}

const StyledIcon = styled.img`
  border-radius: 50%;
  &:hover {
    cursor: pointer;
  }
`