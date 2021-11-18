import { VFC } from "react";

import Error404 from "../../../images/404.svg";
import { index as Typography } from "../../atom/typography/index";
import { PrimaryButton } from "../../atom/button/PrimaryButton";

import { Styled404, StyledFigure } from "./Styles";

type Props = {
  onClickTop: () => void;
};

export const Presenter: VFC<Props> = ({ onClickTop }) => {
  return (
    <Styled404>
      <Typography size="1rem">
        ページが見つかりませんでした。お探しのページは削除されたか、URLが間違っている可能性があります。
      </Typography>
      <StyledFigure>
        <img
          src={Error404}
          alt="ページが見つかりませんでした。お探しのページは削除されたか、URLが間違っている可能性があります。"
          width="auto"
          height="auto"
        />
      </StyledFigure>
      <PrimaryButton onClick={onClickTop}>トップに戻る</PrimaryButton>
    </Styled404>
  );
};
