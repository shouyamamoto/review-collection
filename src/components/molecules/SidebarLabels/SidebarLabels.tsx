import { VFC } from "react";
import { useHistory } from "react-router-dom";

import { Index as Typography } from "../../atom/typography/index";

import { StyledSidebarLabels, StyledLabels, StyledLabel } from "./Styles";

type Props = {
  labels: string[];
};

export const SidebarLabels: VFC<Props> = ({ labels }) => {
  const history = useHistory();
  return (
    <>
      {labels.length > 0 && (
        <StyledSidebarLabels>
          <Typography size="14" weight="bold">
            Topics
          </Typography>
          <StyledLabels>
            {labels.map((label, index) => (
              <StyledLabel
                key={index}
                onClick={() => history.push(`/topics?search=${label}`)}
              >
                {label}
              </StyledLabel>
            ))}
          </StyledLabels>
        </StyledSidebarLabels>
      )}
    </>
  );
};
