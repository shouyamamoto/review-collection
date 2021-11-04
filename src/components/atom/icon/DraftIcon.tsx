import { VFC } from "react";
import { RiDraftLine } from "react-icons/ri";
import styled from "styled-components";
import { COLOR } from "../../../Themes/Color";

type Props = {
  onClick: () => void;
  onMouseEnter: (target: string) => void;
  isShow: boolean;
};

export const DraftIcon: VFC<Props> = ({ onClick, onMouseEnter, isShow }) => {
  return (
    <StyledIconArea
      onMouseEnter={() => onMouseEnter("draft")}
      onMouseLeave={() => onMouseEnter("draft")}
    >
      <StyledSendIcon onClick={onClick} />
      {isShow && <StyledLinkText>下書きに追加</StyledLinkText>}
    </StyledIconArea>
  );
};

const StyledIconArea = styled.div`
  position: relative;
`;

const StyledSendIcon = styled(RiDraftLine)`
  width: 32px;
  height: 32px;
  box-shadow: 0 3px 12px -1px #04253f40;
  background-color: ${COLOR.WHITE};
  border-radius: 24px;
  padding: 10px;
  transition: color 0.2s;

  &:hover {
    cursor: pointer;
    color: ${COLOR.PRIMARY};
  }
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
  width: 150%;
  z-index: 1;
`;
