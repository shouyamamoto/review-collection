import { VFC } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import Error404 from "../../images/404.svg";
import { index as Typography } from "../atom/typography/index";
import { PrimaryButton } from "../atom/button/PrimaryButton";

export const Page404: VFC = () => {
  const history = useHistory();
  const onClickTop = () => {
    history.push("/");
  };

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

const Styled404 = styled.div`
  width: 90%;
  margin: 0 auto;
  padding: 40px 0;
  text-align: center;
`;

const StyledFigure = styled.figure`
  width: 90%;
  max-width: 600px;
  margin: 0 auto;
`;
