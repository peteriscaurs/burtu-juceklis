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
        {/* {!scrabbleWordStore.wordMeaning ? (
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
        ) : ( */}
        <div
          dangerouslySetInnerHTML={{
            __html: scrabbleWordStore.wordMeaning,
          }}
        ></div>
        {/* )} */}
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
          {/* <i
            className={classNames({
              "fa-solid fa-bookmark fa-xl": true,
              "fa-bounce": isAnimationActive,
            })}
            style={{
              color: scrabbleWordStore.isSavedWord
                ? "rgba(131, 58, 180, 0.8)"
                : "rgba(202, 202, 202, 0.8)",
            }}
          ></i> */}
          <svg
            className={classNames({
              "fa-bounce": isAnimationActive,
            })}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
            width="1.13rem"
            fill={
              scrabbleWordStore.isSavedWord
                ? "rgba(131, 58, 180, 0.84)"
                : "rgba(202, 202, 202, 0.8)"
            }
          >
            <path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z" />
          </svg>
        </button>
      </Modal.Footer>
      {/* </Styled.Modal> */}
    </Modal>
  );
}

export default observer(MyModal);
