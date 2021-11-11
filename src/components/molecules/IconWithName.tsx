import { VFC } from "react";
import styled from "styled-components";

import { index as Icon } from "../atom/icon/index";
import { index as Typography } from "../atom/typography/index";

type Props = {
  src: string;
  alt: string;
  width: string;
  height: string;
  username: string;
};

export const IconWithName: VFC<Props> = ({
  src,
  alt,
  width,
  height,
  username,
}) => {
  return (
    <StyledIconWithName>
      <Icon src={src} alt={alt} width={width} height={height} />
      <Typography size="14px">{username}</Typography>
    </StyledIconWithName>
  );
};

const StyledIconWithName = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;
