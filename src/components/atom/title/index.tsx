import React, { VFC } from "react";
import styled from "styled-components";
import { COLOR } from "../../../Themes/Color";
import { DEVICE } from "../../../Themes/Device";

type Props = {
  headline: string;
  children: React.ReactNode;
};

export const index: VFC<Props> = ({ headline, children }) => {
  const showHead = () => {
    switch (headline) {
      case "h1":
        return <StyledH1>{children}</StyledH1>;
      case "h2":
        return <StyledH2>{children}</StyledH2>;
      case "h3":
        return <StyledH3>{children}</StyledH3>;
      case "h4":
        return <StyledH4>{children}</StyledH4>;
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

const StyledH1 = styled.h1`
  font-size: 20px;

  @media ${DEVICE.laptop} {
    font-size: 28px;
  }
`;

const StyledH2 = styled.h2`
  font-size: 18px;

  @media ${DEVICE.laptop} {
    font-size: 26px;
  }
`;

const StyledH3 = styled.h3`
  font-size: 18px;

  @media ${DEVICE.laptop} {
    font-size: 20px;
  }
`;

const StyledH4 = styled.h4`
  font-size: 16px;
  padding-bottom: 4px;
  border-bottom: 1px solid ${COLOR.BACKGROUND};

  @media ${DEVICE.laptop} {
    font-size: 16px;
    border-bottom: none;
  }
`;
