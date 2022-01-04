import React, { VFC, memo } from "react";
import styled from "styled-components";
import { COLOR } from "../../../Themes/Color";
import { StyledButton } from "./index";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
};

export const PrimaryButton: VFC<Props> = memo(
  ({ onClick, disabled, children, type }) => {
    return (
      <StyledBtn
        onClick={onClick}
        disabled={disabled}
        type={type}
        data-testid="primaryButton"
      >
        {children}
      </StyledBtn>
    );
  }
);

PrimaryButton.defaultProps = {
  type: "button",
};

const StyledBtn = styled(StyledButton)`
  background-color: ${(props) =>
    props.disabled ? COLOR.BACKGROUND : COLOR.PRIMARY};
  border-radius: 0.45rem;
  border: none;
  color: ${COLOR.WHITE};
  padding: 14px 20px;
  font-weight: bold;

  &:hover {
    cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  }
`;
