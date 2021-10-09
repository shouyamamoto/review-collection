import { VFC } from "react";
import { RiDraftLine } from "react-icons/ri";
import styled from "styled-components";
import { COLOR } from "../../../Themes/Color";

type Props = {
  onClick: () => void;
};

export const DraftIcon: VFC<Props> = ({ onClick }) => {
  return <StyledSendIcon onClick={onClick} />;
};

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
