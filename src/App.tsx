import { observer } from "mobx-react";
import { useState, useEffect } from "react";
import SearchInput from "./components/SearchInput";
import ResultsTable from "./components/ResultsTable/ResultsTable";
import scrabbleWordStore from "./stores/scrabbleWordStore";
import { ToastContainer, toast } from "react-toastify";
import Footer from "./components/Footer/Footer";
import isScrabbleInputValid from "./helpers/isInputValid";
import getValidationCopy from "./helpers/getValidationCopy";
import logo from "./assets/logo192.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

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

  function handleInputChange(event: React.BaseSyntheticEvent<any>) {
    const value = event.target.value;
    const isValid = isScrabbleInputValid(value);
    if (isValid) {
      setInputValue(value);
      scrabbleWordStore.setValidationCopy("");
      return;
    }
    const copy = getValidationCopy(event.nativeEvent.data);
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
        <img alt="logo" src={logo} width={45} />
        <button
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
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
            width="1.13rem"
            fill={
              !scrabbleWordStore.isSavedWordView
                ? "rgba(202, 202, 202, 0.8)"
                : "rgba(90, 20, 137, 0.803)"
            }
          >
            <path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z" />
          </svg>
          {/* <i
            className="fa-solid fa-bookmark fa-xl"
            style={{
              color: !scrabbleWordStore.isSavedWordView
                ? "rgba(202, 202, 202, 0.8)"
                : "rgba(94, 24, 141, 0.803)",
            }}
          ></i> */}
        </button>
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
      {!scrabbleWordStore.isSavedWordView ? (
        <SearchInput
          value={inputValue}
          onChange={handleInputChange}
          validationCopy={scrabbleWordStore.validationCopy}
          allCaps
          dataAttributes={{ "data-testid": "search-scrabble-word" }}
        />
      ) : (
        <h4 className="saved-words-heading">Saglabātie Vārdi</h4>
      )}
      <ResultsTable />
      <Footer />
    </>
  );
}

export default observer(App);
