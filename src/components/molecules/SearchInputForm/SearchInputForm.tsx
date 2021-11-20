import { VFC } from "react";

import { StyledSearchInputForm, StyledInput, StyledFiSearch } from "./Styles";

type Props = {
  inputValue: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
  onClickSearch: () => void;
};

export const SearchInputForm: VFC<Props> = ({
  inputValue,
  onChange,
  onClickSearch,
}) => {
  return (
    <StyledSearchInputForm>
      <StyledInput
        type="text"
        value={inputValue}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            onClickSearch();
          }
        }}
      />
      <StyledFiSearch onClick={onClickSearch} />
    </StyledSearchInputForm>
  );
};
