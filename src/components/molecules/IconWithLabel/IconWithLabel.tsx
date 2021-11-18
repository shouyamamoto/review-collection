import { VFC } from "react";

import { index as Icon } from "../../atom/icon/index";
import { StyledIconWithLabel, StyledLabel, StyledHiddenInput } from "./Styles";

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
