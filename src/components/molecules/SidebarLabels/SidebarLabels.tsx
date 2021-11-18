import { VFC } from "react";

import { index as Typography } from "../../atom/typography/index";

import { StyledSidebarLabels, StyledLabels, StyledLabel } from "./Styles";

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
