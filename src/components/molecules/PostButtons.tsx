import { VFC } from "react";
import styled from "styled-components";

import { AddImageIcon } from "../atom/icon/AddImageIcon";
import { PreviewIcon } from "../atom/icon/PreviewIcon";
import { QuestionIcon } from "../atom/icon/QuestionIcon";
import { SendIcon } from "../atom/icon/SendIcon";
import { isValidPost } from "../../Themes/Validations";
import { DEVICE } from "../../Themes/Device";

type Props = {
  title: string;
  text: string;
  onClick: () => void;
  onClickAddImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
  sendPost: (title: string, text: string) => Promise<void>;
};

export const PostButtons: VFC<Props> = ({
  title,
  text,
  onClick,
  onClickAddImage,
  sendPost,
}) => {
  return (
    <StyledButtonWrap>
      <PreviewIcon onClick={onClick} />
      <AddImageIcon onChange={onClickAddImage} />
      <QuestionIcon />
      <SendIcon
        onClick={() => sendPost(title, text)}
        disabled={!isValidPost(title, text)}
      />
    </StyledButtonWrap>
  );
};

const StyledButtonWrap = styled.div`
  position: fixed;
  bottom: 0;
  right: 10%;
  display: flex;
  justify-content: flex-end;
  gap: 0 20px;
  margin: 0 auto;
  padding: 20px 0;

  @media ${DEVICE.laptopL} {
    top: 80px;
    right: 3%;
    bottom: auto;
    justify-content: flex-start;
    flex-direction: column;
    gap: 14px 0;
  }
`;
