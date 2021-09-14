import React, { VFC } from "react";
import styled from "styled-components";
import { DEVICE } from "../../../Themes/Device";

type Props = {
  children: React.ReactNode;
};

export const index: VFC<Props> = ({ children }) => {
  return <StyledLabel>{children}</StyledLabel>;
};

const StyledLabel = styled.label`
  font-size: 14px;
  display: inline-block;
  margin-bottom: 12px;

  @media ${DEVICE.mobileL} {
    font-size: 16px;
  }
`;
