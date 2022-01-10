import React, { VFC, memo } from "react";
import styled from "styled-components";
import { DEVICE } from "../../../Themes/Device";

type Props = {
  children: React.ReactNode;
};

export const Index: VFC<Props> = memo(({ children }) => {
  return <StyledLabel>{children}</StyledLabel>;
});

const StyledLabel = styled.label`
  font-size: 12px;
  display: inline-block;
  margin-bottom: 6px;
  font-weight: bold;

  @media ${DEVICE.tabletL} {
    font-size: 14px;
  }
`;
