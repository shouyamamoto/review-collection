import { VFC } from "react";

import { index as Typography } from "../../atom/typography/index";
import { index as Logo } from "../../atom/logo/index";
import { COLOR } from "../../../Themes/Color";

import { StyledLogoContainer } from "./Styles";

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
