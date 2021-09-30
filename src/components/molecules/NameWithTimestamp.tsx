import { VFC } from "react";
import styled from "styled-components";

import { DEVICE } from "../../Themes/Device";
import { index as Typography } from "../atom/typography/index";

type Props = {
  username: string;
  timestamp: string;
};

export const NameWithTimestamp: VFC<Props> = ({ username, timestamp }) => {
  return (
    <StyledNameWithTimestamp>
      <Typography size="0.7rem">{username}</Typography>
      <Typography size="0.7rem">{timestamp}に公開</Typography>
    </StyledNameWithTimestamp>
  );
};

const StyledNameWithTimestamp = styled.div`
  margin-left: 0.4rem;

  @media ${DEVICE.laptop} {
    margin-left: 0.8rem;
  }
`;
