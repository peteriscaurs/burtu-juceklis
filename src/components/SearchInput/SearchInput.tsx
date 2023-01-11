import { useState } from "react";
import scrabbleWordStore from "../../stores/scrabbleWordStore";
import * as Styled from "./SearchInput.styled";

export interface TextInputProps {
  /**
   * The value of the input
   * */
  value: string;
  /**
   * Whether text is all caps or not
   * */
  allCaps?: boolean;
  /**
   * onChange callback function
   * */
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * Text describing what went wrong
   */
  validationCopy: string;
  /**
   * Data attributes
   * */
  dataAttributes?: {
    [key: string]: string;
  };
}

function SearchInput({
  value,
  onChange,
  validationCopy,
  dataAttributes,
}: TextInputProps) {
  const [searchValue, setSearchValue] = useState("");

  function handleNewSearch() {
    setSearchValue(value);
    if (value === searchValue) return;
    scrabbleWordStore.setCurrentPage(1);
    // scrabbleWordStore.setResults(value);
    if (scrabbleWordStore.isSavedWordView) {
      if (value === "") {
        scrabbleWordStore.setSavedWords(
          JSON.parse(localStorage.getItem("savedWords") as string)
        );
        return;
      }
      const res = scrabbleWordStore.getSavedWordsResults(value);
      scrabbleWordStore.setSavedWords(res);
      return;
    }
    scrabbleWordStore.setResults(value);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      handleNewSearch();
    }
  }

  function handleButtonClick() {
    handleNewSearch();
  }

  return (
    <Styled.Wrapper>
      <Styled.InputWrapper>
        <Styled.TextInput
          value={value.toLowerCase()}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          {...dataAttributes}
        ></Styled.TextInput>
        <Styled.Button onClick={handleButtonClick}>
          <i className="fa fa-search fa-md"></i>
        </Styled.Button>
      </Styled.InputWrapper>
      <Styled.ValidationCopy>{validationCopy}</Styled.ValidationCopy>
    </Styled.Wrapper>
  );
}

export default SearchInput;
