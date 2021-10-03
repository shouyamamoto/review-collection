import { VFC, memo } from "react";
import styled from "styled-components";
import Logo from "../../../images/logo.svg";

type Props = {
  width?: string;
};

export const index: VFC<Props> = memo(({ width }) => {
  return <StyledLogo src={Logo} alt="" width={width} />;
});

const StyledLogo = styled.img`
  width: ${(props) => props.width};
  max-width: 320px;
  display: inline-block;
`;
