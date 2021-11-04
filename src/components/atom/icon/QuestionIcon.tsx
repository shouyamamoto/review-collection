import { VFC } from "react";
import styled from "styled-components";
import { BsQuestion } from "react-icons/bs";

import { COLOR } from "../../../Themes/Color";
import { DEVICE } from "../../../Themes/Device";

type Props = {
  onMouseEnter: (target: string) => void;
  isShow: boolean;
};

export const QuestionIcon: VFC<Props> = ({ isShow, onMouseEnter }) => {
  return (
    <StyledAnchor
      href="https://github.com/shouyamamoto/review-collection/#review-collection"
      target="_blank"
      rel="noreferrer"
      onMouseEnter={() => onMouseEnter("writing")}
      onMouseLeave={() => onMouseEnter("writing")}
    >
      <StyledBsQuestion />
      {isShow && <StyledLinkText>書き方</StyledLinkText>}
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
  position: relative;
  line-height: 1;
`;

const StyledLinkText = styled.p`
  position: absolute;
  bottom: -24px;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${COLOR.GRAY};
  color: ${COLOR.WHITE};
  font-size: 12px;
  text-align: center;
  border-radius: 4px;
  padding: 2px 20px;
  width: 100%;
  z-index: 1;
`;
