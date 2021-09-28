import { VFC } from "react";
import { BiSend } from "react-icons/bi";
import styled from "styled-components";
import { COLOR } from "../../../Themes/Color";

type Props = {
  onClick: () => void;
  disabled: boolean;
};

type IconProps = {
  disabled: boolean;
};

export const SendIcon: VFC<Props> = ({ onClick, disabled }) => {
  return <StyledSendIcon onClick={onClick} disabled={disabled} />;
};

const StyledSendIcon = styled(BiSend)<IconProps>`
  width: 32px;
  height: 32px;
  box-shadow: ${(props) =>
    props.disabled ? "none" : "0 3px 12px -1px #04253f40"};
  background-color: ${(props) =>
    props.disabled ? COLOR.BACKGROUND : COLOR.PRIMARY};
  color: ${COLOR.WHITE};
  border-radius: 24px;
  padding: 10px;

  &:hover {
    cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  }
`;
