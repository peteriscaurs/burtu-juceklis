import { observer } from "mobx-react";
import { useState, useEffect } from "react";
import SearchInput from "./components/SearchInput";
import ResultsTable from "./components/ResultsTable/ResultsTable";
import scrabbleWordStore from "./stores/scrabbleWordStore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Footer from "./components/Footer/Footer";
import isScrabbleInputValid from "./helpers/isInputValid";
import getValidationCopy from "./helpers/getValidationCopy";
import { SourceLetters } from "./helpers/sourceLetters";

let didInit = false;

function App() {
  const [inputValue, setInputValue] = useState("");

  const notify = () => toast("Te nekā nav 🧐");

  useEffect(() => {
    if (!didInit) {
      didInit = true;
      // only runs once per app load
      const setupStore = async () => {
        await scrabbleWordStore.initWordFinder();
      };
      setupStore();
    }
  }, []);

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    const isValid = isScrabbleInputValid(value);
    if (isValid) {
      setInputValue(value);
      scrabbleWordStore.setValidationCopy("");
      return;
    }
    const lastInputLetter = value[
      value.length - 1
    ].toLowerCase() as keyof SourceLetters;
    const copy = getValidationCopy(lastInputLetter);
    scrabbleWordStore.setValidationCopy(copy);
  }

  return (
    <>
      <div
        className="header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <img src="/favicon.ico" />
        <i
          className="fa-solid fa-bookmark fa-xl"
          style={{
            color: !scrabbleWordStore.isSavedWordView
              ? "rgba(202, 202, 202, 0.8)"
              : "rgba(94, 24, 141, 0.803)",
          }}
          onClick={() => {
            if (!scrabbleWordStore.savedWords.length) {
              notify(); // todo: debounce
              return;
            }
            scrabbleWordStore.setSavedWordView(
              !scrabbleWordStore.isSavedWordView
            );
            setInputValue("");
            scrabbleWordStore.setValidationCopy("");
            scrabbleWordStore.setCurrentPage(1);
          }}
        ></i>
      </div>
      <h1 className="title">Burtu Juceklis</h1>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="light"
      />
      <SearchInput
        value={inputValue}
        onChange={handleInputChange}
        validationCopy={scrabbleWordStore.validationCopy}
        allCaps
        dataAttributes={{ "data-testid": "search-scrabble-word" }}
      />
      <ResultsTable />
      <Footer />
    </>
  );
}

export default observer(App);
