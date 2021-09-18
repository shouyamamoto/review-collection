import { VFC } from "react";
import { index as Icon } from "../atom/icon/index";
import { COLOR } from "../../Themes/Color";
import styled from "styled-components";

type Props = {
  src: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const IconWithLabel: VFC<Props> = ({ src, onChange }) => {
  return (
    <StyledIconWithLabel>
      <Icon src={src} width="112" height="112" />
      <StyledLabel>
        変更する
        <StyledHiddenInput type="file" onChange={onChange} />
      </StyledLabel>
    </StyledIconWithLabel>
  );
};

const StyledHiddenInput = styled.input`
  display: none;
`;

const StyledIconWithLabel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledLabel = styled.label`
  display: inline-block;
  text-align: center;
  padding: 5px 0;
  font-size: 12px;
  color: ${COLOR.GRAY};

  &:hover {
    cursor: pointer;
  }
`;
