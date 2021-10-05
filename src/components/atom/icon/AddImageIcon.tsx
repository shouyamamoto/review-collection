import { VFC } from "react";
import styled from "styled-components";
import { RiImageAddLine } from "react-icons/ri";
import { COLOR } from "../../../Themes/Color";
import { DEVICE } from "../../../Themes/Device";

type Props = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const AddImageIcon: VFC<Props> = ({ onChange }) => {
  return (
    <StyledLabel>
      <StyledRiImageAddLine />
      <StyledHiddenInput type="file" onChange={onChange} />
    </StyledLabel>
  );
};

const StyledLabel = styled.label`
  display: inline-block;
  text-align: center;
  font-size: 12px;

  &:hover {
    cursor: pointer;
  }

  @media ${DEVICE.laptopL} {
  }
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
