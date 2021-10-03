import { VFC } from "react";
import styled from "styled-components";

import { COLOR } from "../../Themes/Color";
import { index as Typography } from "../atom/typography/index";
import { index as Logo } from "../atom/logo/index";

export const LogoWithTypography: VFC = () => {
  return (
    <StyledLogoContainer>
      <Logo width="200px" />
      <Typography size="14px" color={COLOR.PRIMARY} weight="600">
        レビューはきっと宝になる
      </Typography>
    </StyledLogoContainer>
  );
};

const StyledLogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
