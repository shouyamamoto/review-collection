import styled from "styled-components";
import { COLOR } from "../../../Themes/Color";

export const StyledHiddenInput = styled.input`
  display: none;
`;

export const StyledIconWithLabel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyledLabel = styled.label`
  display: inline-block;
  text-align: center;
  padding: 5px 0;
  font-size: 12px;
  color: ${COLOR.GRAY};

  &:hover {
    cursor: pointer;
  }
`;
