import React, { VFC } from "react";
import styled from "styled-components";

type Props = {
  size: string;
  weight?: string;
  margin?: string;
  color?: string;
  children: React.ReactNode;
};

type TypoProps = {
  size: string;
  weight?: string;
  margin?: string;
  color?: string;
};

export const index: VFC<Props> = ({
  size,
  weight,
  margin,
  color,
  children,
}) => {
  return (
    <StyledTypography size={size} weight={weight} margin={margin} color={color}>
      {children}
    </StyledTypography>
  );
};

const StyledTypography = styled.p<TypoProps>`
  font-size: ${(props) => props.size};
  font-weight: ${(props) => props.weight};
  margin: ${(props) => props.margin};
  color: ${(props) => props.color};
  font-weight: ${(props) => props.weight};
`;
