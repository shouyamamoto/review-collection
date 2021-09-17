import React, { memo, VFC } from "react";
import styled from "styled-components";
import { COLOR } from "../../../Themes/Color";

type NoteProps = {
  isValid: boolean;
};

type Props = {
  isValid: () => boolean;
  children: React.ReactNode;
};

export const ErrorMsg: VFC<Props> = memo(({ isValid, children }) => {
  return <StyledErrorMsg isValid={!isValid()}>{children}</StyledErrorMsg>;
});

const StyledErrorMsg = styled.p<NoteProps>`
  font-size: 12px;
  color: ${(props) => (props?.isValid ? `${COLOR.DANGER}` : `${COLOR.GRAY}`)};
  margin-top: 6px;
`;
