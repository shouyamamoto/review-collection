import { VFC } from "react";
import { BiSend } from "react-icons/bi";
import styled from "styled-components";
import { COLOR } from "../../../Themes/Color";

type Props = {
  onClick: () => void;
  disabled: boolean;
  onMouseEnter: (target: string) => void;
  isShow: boolean;
};

type IconProps = {
  disabled: boolean;
};

export const SendIcon: VFC<Props> = ({
  onClick,
  disabled,
  isShow,
  onMouseEnter,
}) => {
  return (
    <StyledIconArea
      onMouseEnter={() => onMouseEnter("send")}
      onMouseLeave={() => onMouseEnter("send")}
    >
      <StyledSendIcon onClick={onClick} disabled={disabled} />
      {isShow && <StyledLinkText>投稿する</StyledLinkText>}
    </StyledIconArea>
  );
};

const StyledIconArea = styled.div`
  position: relative;
`;

const StyledSendIcon = styled(BiSend)<IconProps>`
  width: 32px;
  height: 32px;
  color: ${COLOR.WHITE};
  border-radius: 24px;
  padding: 10px;
  box-shadow: ${(props) =>
    props.disabled ? "none" : "0 3px 12px -1px #04253f40"};
  background-color: ${(props) =>
    props.disabled ? COLOR.BACKGROUND : COLOR.PRIMARY};
  pointer-events: ${(props) => (props.disabled ? "none" : "all")};

  &:hover {
    cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
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
  width: 100%;
  z-index: 1;
`;
