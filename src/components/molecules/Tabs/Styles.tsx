import styled from "styled-components";
import { COLOR } from "../../../Themes/Color";
import { DEVICE } from "../../../Themes/Device";

type LiProps = {
  isActive: boolean;
};

export const StyledTabs = styled.ul`
  display: flex;
  flex-direction: row;
  gap: 0 10px;
  margin-bottom: 24px;

  @media ${DEVICE.laptop} {
    flex-direction: column;
    justify-content: flex-start;
    flex: 1 1 200px;
  }
`;

export const StyledTab = styled.li<LiProps>`
  background-color: ${(props) => (props.isActive ? COLOR.SECONDARY : "none")};
  color: ${(props) => (props.isActive ? COLOR.PRIMARY : "#000000")};
  font-weight: ${(props) => (props.isActive ? "bold" : "400")};
  font-size: 12px;
  padding: 14px 40px;
  text-align: center;
  border-radius: 50px;

  @media ${DEVICE.laptop} {
    padding: 14px 24px;
    font-size: 14px;
  }
  &:hover {
    cursor: pointer;
  }
`;
