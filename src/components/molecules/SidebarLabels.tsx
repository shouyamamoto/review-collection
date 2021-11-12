import { VFC } from "react";
import styled from "styled-components";

import { index as Typography } from "../atom/typography/index";
import { COLOR } from "../../Themes/Color";

type Props = {
  labels: string[];
};

export const SidebarLabels: VFC<Props> = ({ labels }) => {
  return (
    <>
      {labels.length > 0 && (
        <StyledSidebarLabels>
          <Typography size="14" weight="bold">
            Topics
          </Typography>
          <StyledLabels>
            {labels.map((label, index) => (
              <StyledLabel key={index}>{label}</StyledLabel>
            ))}
          </StyledLabels>
        </StyledSidebarLabels>
      )}
    </>
  );
};

const StyledSidebarLabels = styled.div`
  width: 100%;
  background-color: ${COLOR.WHITE};
  border-radius: 10px;
  display: grid;
  gap: 12px;
  padding: 20px;
  box-sizing: border-box;
`;

const StyledLabels = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr;
  background-color: ${COLOR.WHITE};
  border-radius: 10px;
  gap: 12px;
  box-sizing: border-box;
`;

const StyledLabel = styled.li`
  display: grid;
  place-items: center;
  font-size: 10px;
  text-align: center;
  background-color: ${COLOR.ACCENT};
  color: ${COLOR.WHITE};
  padding: 6px;
  border-radius: 4px;
`;
