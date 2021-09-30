import React, { VFC } from "react";
import styled from "styled-components";
import { DEVICE } from "../../../Themes/Device";

type Props = {
  headline: string;
  children: React.ReactNode;
};

export const index: VFC<Props> = ({ headline, children }) => {
  const showHead = () => {
    switch (headline) {
      case "h1":
        return <h1>{children}</h1>;
      case "h2":
        return <StyledH2>{children}</StyledH2>;
      case "h3":
        return <h3>{children}</h3>;
      case "h4":
        return <h4>{children}</h4>;
      case "h5":
        return <h5>{children}</h5>;
      case "h6":
        return <h6>{children}</h6>;
      default:
        return;
    }
  };
  return <>{showHead()}</>;
};

const StyledH2 = styled.h2`
  font-size: 18px;

  @media ${DEVICE.laptop} {
    font-size: 28px;
  }
`;
