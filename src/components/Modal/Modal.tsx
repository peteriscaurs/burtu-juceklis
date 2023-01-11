import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import classNames from "classnames";
import scrabbleWordStore from "../../stores/scrabbleWordStore";
// import * as Styled from "./Modal.styled";
import "./modal.scss";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";

interface ModalProps {
  show: boolean;
  onClose: () => void;
}

function MyModal({ show, onClose }: ModalProps) {
  const [isAnimationActive, setIsAnimationActive] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsAnimationActive(false);
    }, 1000);
  }, [isAnimationActive]);

  function closeOnEscapeKeyDown(event: KeyboardEvent) {
    if (event.key === "Escape") {
      onClose();
    }
  }

  useEffect(() => {
    document.body.addEventListener("keydown", closeOnEscapeKeyDown);
    return function cleanup() {
      document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
    };
  }, []);

  if (!show) {
    return null;
  }

  return (
    <Modal
      show={show}
      onHide={() => onClose()}
      // onClose={() => onClose()}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      scrollable
    >
      {/* <Styled.Modal onClick={() => onClose()}> */}
      <Modal.Header closeButton>
        {/* <button onClick={onClose}>
          <i className="fa-solid fa-xmark fa-md"></i>
        </button> */}
      </Modal.Header>
      <Modal.Body className="modal-body">
        {scrabbleWordStore.loadingWordMeaning ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <div
            dangerouslySetInnerHTML={{
              __html: scrabbleWordStore.wordMeaning,
            }}
          ></div>
        )}
      </Modal.Body>
      <Modal.Footer className="modal-footer">
        <button
          onClick={() => {
            if (!scrabbleWordStore.isSavedWord) {
              scrabbleWordStore.saveWord(scrabbleWordStore.selectedWord);
              setIsAnimationActive(true);
            } else {
              scrabbleWordStore.removeWord(
                scrabbleWordStore.selectedWord?.letters
              );
              // detect if last word in current page data
              if (
                scrabbleWordStore.savedWords.length % 10 === 0 &&
                scrabbleWordStore.currentPage !== 1
              ) {
                scrabbleWordStore.setCurrentPage(
                  scrabbleWordStore.currentPage - 1
                );
              }
              if (scrabbleWordStore.savedWords.length === 0) {
                scrabbleWordStore.setSavedWordView(false);
              }
            }
          }}
        >
          <i
            className={classNames({
              "fa-solid fa-bookmark fa-xl": true,
              "fa-bounce": isAnimationActive,
            })}
            style={{
              color: scrabbleWordStore.isSavedWord
                ? "rgba(131, 58, 180, 0.8)"
                : "rgba(202, 202, 202, 0.8)",
            }}
          ></i>
        </button>
      </Modal.Footer>
      {/* </Styled.Modal> */}
    </Modal>
  );
}

export default observer(MyModal);
