import { VFC } from "react";

import { StyledSearchInputForm, StyledInput, StyledFiSearch } from "./Styles";

type Props = {
  inputValue: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
  onClickSearch: () => void;
  onClickOpenSearch: () => void;
  isOpen: boolean;
};

export const SearchInputForm: VFC<Props> = ({
  inputValue,
  onChange,
  onClickSearch,
  onClickOpenSearch,
  isOpen,
}) => {
  return (
    <StyledSearchInputForm isOpen={isOpen}>
      <StyledInput
        type="text"
        value={inputValue}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            onClickOpenSearch();
            onClickSearch();
          }
        }}
      />
      <StyledFiSearch
        onClick={() => {
          onClickSearch();
          onClickOpenSearch();
        }}
      />
    </StyledSearchInputForm>
  );
};
