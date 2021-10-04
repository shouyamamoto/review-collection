import { VFC } from "react";
import styled from "styled-components";
import { AiOutlineQuestionCircle } from "react-icons/ai";

import { COLOR } from "../../../Themes/Color";
import { DEVICE } from "../../../Themes/Device";

export const QuestionIcon: VFC = () => {
  return (
    <a
      href="https://github.com/shouyamamoto/review-collection/#review-collection"
      target="_blank"
      rel="noreferrer"
    >
      <StyledAiOutlineQuestionCircle />
    </a>
  );
};

const StyledAiOutlineQuestionCircle = styled(AiOutlineQuestionCircle)`
  width: 32px;
  height: 32px;
  background-color: ${COLOR.WHITE};
  color: ${COLOR.GRAY};
  padding: 10px;
  border-radius: 24px;
  box-shadow: 0 3px 12px -1px #04253f40;

  &:hover {
    cursor: pointer;
    color: ${COLOR.PRIMARY};
  }

  @media ${DEVICE.laptopL} {
  }
`;
