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
          {/* <i className="fa fa-search fa-md"></i> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            width="1rem"
            fill="#fff"
          >
            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z" />
          </svg>
        </Styled.Button>
      </Styled.InputWrapper>
      <Styled.ValidationCopy>{validationCopy}</Styled.ValidationCopy>
    </Styled.Wrapper>
  );
}

export default SearchInput;
