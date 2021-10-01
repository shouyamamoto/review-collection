import React, { VFC } from "react";
import styled from "styled-components";

type Props = {
  size: string;
  bold?: string;
  margin?: string;
  children: React.ReactNode;
};

type TypoProps = {
  size: string;
  bold?: string;
  margin?: string;
};

export const index: VFC<Props> = ({ size, bold, margin, children }) => {
  return (
    <StyledTypography size={size} bold={bold} margin={margin}>
      {children}
    </StyledTypography>
  );
};

const StyledTypography = styled.p<TypoProps>`
  font-size: ${(props) => props.size};
  font-weight: ${(props) => props.bold};
  margin: ${(props) => props.margin};
`;
