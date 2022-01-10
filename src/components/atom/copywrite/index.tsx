import { VFC } from "react";
import styled from "styled-components";

import { COLOR } from "../../../Themes/Color";

type Props = {
  children: string;
};

export const Index: VFC<Props> = ({ children }) => {
  return <StyledCopy>{children}</StyledCopy>;
};

const StyledCopy = styled.small`
  display: block;
  margin: 60px 0 0 0;
  text-align: center;
  color: ${COLOR.GRAY};
  font-size: 12px;
`;
