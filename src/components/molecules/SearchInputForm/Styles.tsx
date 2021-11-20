import styled from "styled-components";
import { FiSearch } from "react-icons/fi";

import { COLOR } from "../../../Themes/Color";

export const StyledSearchInputForm = styled.div`
  display: flex;
  gap: 14px;
  align-items: center;
  justify-content: space-between;
  border: 1px solid ${COLOR.GRAY};
  padding: 0 20px;
  border-radius: 50px;
  width: 400px;
`;

export const StyledInput = styled.input`
  padding: 10px 14px;
  border: none;
  outline: none;
  font-size: 16px;
  width: 100%;
`;

export const StyledFiSearch = styled(FiSearch)`
  font-size: 20px;
  padding: 4px;

  &:hover {
    cursor: pointer;
  }
`;
