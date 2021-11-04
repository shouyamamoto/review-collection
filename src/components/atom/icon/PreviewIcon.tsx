import { VFC } from "react";
import { BiRightArrowCircle } from "react-icons/bi";
import styled from "styled-components";
import { COLOR } from "../../../Themes/Color";
import { DEVICE } from "../../../Themes/Device";

type Props = {
  onClick: () => void;
  onMouseEnter: (target: string) => void;
  isShow: boolean;
};

export const PreviewIcon: VFC<Props> = ({ onClick, onMouseEnter, isShow }) => {
  return (
    <StyledIconArea
      onMouseEnter={() => onMouseEnter("preview")}
      onMouseLeave={() => onMouseEnter("preview")}
    >
      <StyledBiRightArrowCircle onClick={onClick} />
      {isShow && <StyledLinkText>プレビュー</StyledLinkText>}
    </StyledIconArea>
  );
};

const StyledIconArea = styled.div`
  position: relative;
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
  width: 140%;
  z-index: 1;
`;

const StyledBiRightArrowCircle = styled(BiRightArrowCircle)`
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
    display: none;
  }
`;
