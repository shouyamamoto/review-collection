import React, { VFC } from "react";
import styled from "styled-components";

type Props = {
  size: string;
  children: React.ReactNode;
};

type TypoProps = {
  size: string;
};

export const index: VFC<Props> = ({ size, children }) => {
  return <StyledTypography size={size}>{children}</StyledTypography>;
};

const StyledTypography = styled.p<TypoProps>`
  font-size: ${(props) => props.size};
`;
