import styled from "styled-components";
import { COLOR } from "../../../Themes/Color";

export const StyledSidebarUserProfile = styled.div`
  width: 100%;
  background-color: ${COLOR.WHITE};
  border-radius: 10px;
  display: grid;
  gap: 12px;
  padding: 20px;
  box-sizing: border-box;
`;

export const StyledSidebarAuthor = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 14px;
  align-items: center;
  max-width: 220px;
`;
