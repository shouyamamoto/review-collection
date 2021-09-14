import React, { VFC } from "react";
import styled from "styled-components";

type NoteProps = {
  isValid: boolean;
};

type Props = {
  isUserNameValid: () => boolean;
  children: React.ReactNode;
};

export const ErrorMsg: VFC<Props> = ({ isUserNameValid, children }) => {
  return (
    <StyledErrorMsg isValid={!isUserNameValid()}>{children}</StyledErrorMsg>
  );
};

const StyledErrorMsg = styled.p<NoteProps>`
  font-size: 14px;
  color: ${(props) => (props?.isValid ? "red" : "green")};
  margin-top: 10px;
`;
