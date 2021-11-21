import styled from "styled-components";
import { FiSearch } from "react-icons/fi";

import { COLOR } from "../../../Themes/Color";

type OpenProps = {
  isOpen: boolean;
};

export const StyledSearchInputForm = styled.div<OpenProps>`
  transform: ${(props) =>
    props.isOpen ? "translateY(0)" : "translateY(-100%)"};
  height: ${(props) => (props.isOpen ? "auto" : "0")};
  opacity: ${(props) => (props.isOpen ? "1" : "0")};
  pointer-events: ${(props) => (props.isOpen ? "all" : "none")};
  display: flex;
  gap: 14px;
  align-items: center;
  justify-content: space-between;
  border: 1px solid ${COLOR.GRAY};
  padding: 0 20px;
  border-radius: 50px;
  width: 90%;
  max-width: 400px;
  margin: ${(props) => (props.isOpen ? "0 auto 40px " : "0")};
  box-sizing: border-box;
  transition: all 0.3s;
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
