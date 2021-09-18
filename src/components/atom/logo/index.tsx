import { VFC, memo } from "react";
import styled from "styled-components";
import Logo from "../../../images/logo.svg";

export const index: VFC = memo(() => {
  return <StyledLogo src={Logo} alt="" />;
});

const StyledLogo = styled.img`
  text-align: center;
  width: 80%;
  max-width: 320px;
  margin: 0 auto 40px;
  display: block;
`;
