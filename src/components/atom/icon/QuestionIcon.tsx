import { VFC } from "react";
import styled from "styled-components";
import { BsQuestion } from "react-icons/bs";

import { COLOR } from "../../../Themes/Color";
import { DEVICE } from "../../../Themes/Device";

export const QuestionIcon: VFC = () => {
  return (
    <StyledAnchor
      href="https://github.com/shouyamamoto/review-collection/#review-collection"
      target="_blank"
      rel="noreferrer"
    >
      <StyledBsQuestion />
    </StyledAnchor>
  );
};

const StyledBsQuestion = styled(BsQuestion)`
  width: 32px;
  height: 32px;
  background-color: ${COLOR.WHITE};
  padding: 10px;
  border-radius: 24px;
  box-shadow: 0 3px 12px -1px #04253f40;
  transition: color 0.2s;

  &:hover {
    cursor: pointer;
    color: ${COLOR.PRIMARY};
  }

  @media ${DEVICE.laptopL} {
  }
`;

const StyledAnchor = styled.a`
  line-height: 1;
`;
