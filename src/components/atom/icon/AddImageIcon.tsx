import { VFC } from "react";
import styled from "styled-components";
import { RiImageAddLine } from "react-icons/ri";
import { COLOR } from "../../../Themes/Color";
import { DEVICE } from "../../../Themes/Device";

type Props = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onMouseEnter: (target: string) => void;
  isShow: boolean;
};

export const AddImageIcon: VFC<Props> = ({
  onChange,
  onMouseEnter,
  isShow,
}) => {
  return (
    <StyledLabel
      onMouseEnter={() => onMouseEnter("image")}
      onMouseLeave={() => onMouseEnter("image")}
    >
      <StyledRiImageAddLine />
      <StyledHiddenInput type="file" onChange={onChange} />
      {isShow && <StyledLinkText>画像を追加</StyledLinkText>}
    </StyledLabel>
  );
};

const StyledLabel = styled.label`
  position: relative;
  display: inline-block;
  text-align: center;
  font-size: 12px;

  &:hover {
    cursor: pointer;
  }

  @media ${DEVICE.laptopL} {
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
  width: 140%;
  z-index: 1;
`;

const StyledRiImageAddLine = styled(RiImageAddLine)`
  width: 32px;
  height: 32px;
  background-color: ${COLOR.WHITE};
  padding: 10px;
  border-radius: 24px;
  box-shadow: 0 3px 12px -1px #04253f40;
  transition: color 0.2s;

  &:hover {
    color: ${COLOR.PRIMARY};
  }
`;

const StyledHiddenInput = styled.input`
  display: none;
`;
