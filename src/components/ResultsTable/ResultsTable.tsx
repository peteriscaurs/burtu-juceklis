import { observer } from "mobx-react";
import { useMemo, useState } from "react";
import scrabbleWordStore from "../../stores/scrabbleWordStore";
import Modal from "../Modal/Modal";
import Pagination from "./Pagination/Pagination";
import * as Styled from "./ResultsTable.styled";
import { Word } from "../../types/types";

let PageSize = 10;

function ResultsTable() {
  const [show, setShow] = useState(false);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (scrabbleWordStore.currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    if (!scrabbleWordStore.isSavedWordView) {
      return JSON.parse(localStorage.getItem("results") as string)?.slice(
        firstPageIndex,
        lastPageIndex
      );
    }
    return scrabbleWordStore.savedWords?.slice(firstPageIndex, lastPageIndex);
  }, [
    scrabbleWordStore.currentPage,
    scrabbleWordStore.results,
    scrabbleWordStore.savedWords,
    scrabbleWordStore.isSavedWordView,
  ]);

  async function showMeaning(word: Word) {
    await scrabbleWordStore.retrieveEntry(word.letters);
    scrabbleWordStore.setSelectedWord(word);
    setShow(true);
  }

  function handleKeyDown(e: React.KeyboardEvent, word: Word) {
    if (e.key === "Enter") {
      showMeaning(word);
    }
  }

  function renderTable() {
    const table = (
      <Styled.Table>
        <thead>
          <tr>
            <Styled.Th>Vārds</Styled.Th>
            <Styled.Th>Vērtība</Styled.Th>
          </tr>
        </thead>
        <Styled.TBody>
          {currentTableData?.map((word: Word, i: number) => {
            return (
              <Styled.Row
                key={i}
                onClick={() => showMeaning(word)}
                tabIndex={0}
                onKeyDown={(event: React.KeyboardEvent) =>
                  handleKeyDown(event, word)
                }
              >
                <td>{word.letters}</td>
                <td>{word.value}</td>
              </Styled.Row>
            );
          })}
        </Styled.TBody>
      </Styled.Table>
    );
    if (scrabbleWordStore.results !== undefined) {
      if (
        !scrabbleWordStore.results.length &&
        !scrabbleWordStore.isSavedWordView
      ) {
        return <Styled.NoResults>nav rezultātu</Styled.NoResults>;
      }
      return table;
    }
    if (JSON.parse(localStorage.getItem("results") as string)?.length) {
      return table;
    }
    if (!scrabbleWordStore.savedWords?.length) {
      return;
    }
    return table;
  }

  function getResultsLength() {
    if (scrabbleWordStore.results === undefined) {
      return JSON.parse(localStorage.getItem("results") as string)?.length || 0;
    }
    return scrabbleWordStore.results?.length || 0;
  }

  return (
    <Styled.Wrapper>
      {renderTable()}
      <Pagination
        className="pagination-bar"
        currentPage={scrabbleWordStore.currentPage}
        totalCount={
          scrabbleWordStore.isSavedWordView
            ? scrabbleWordStore.savedWords?.length
            : getResultsLength()
        }
        pageSize={PageSize}
        onPageChange={(page: number) => scrabbleWordStore.setCurrentPage(page)}
      />
      <Modal show={show} onClose={() => setShow(false)} />
    </Styled.Wrapper>
  );
}

export default observer(ResultsTable);
