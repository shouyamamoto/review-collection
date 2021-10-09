import { VFC } from "react";
import { BiRightArrowCircle } from "react-icons/bi";
import styled from "styled-components";
import { COLOR } from "../../../Themes/Color";
import { DEVICE } from "../../../Themes/Device";

type Props = {
  onClick: () => void;
};

export const PreviewIcon: VFC<Props> = ({ onClick }) => {
  return <StyledBiRightArrowCircle onClick={onClick} />;
};

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
    visibility: hidden;
  }
`;
