import React, { VFC } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

type Props = {
  to: string;
  children: React.ReactNode;
};

export const Index: VFC<Props> = ({ to, children }) => {
  return <StyledLink to={to}>{children}</StyledLink>;
};

const StyledLink = styled(Link)`
  line-height: 1;
`;
