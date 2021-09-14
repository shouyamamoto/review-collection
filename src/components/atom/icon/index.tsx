import { VFC } from "react";
import styled from "styled-components";

type Props = {
  src: string;
  width?: string;
  height?: string;
  onClick?: () => void;
};

export const index: VFC<Props> = ({ src, width, height, onClick }) => {
  return (
    <StyledIcon
      src={src}
      alt=""
      width={width}
      height={height}
      onClick={onClick}
    />
  );
};

const StyledIcon = styled.img`
  border-radius: 50%;
  &:hover {
    cursor: pointer;
  }
`;
