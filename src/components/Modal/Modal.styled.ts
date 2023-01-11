import styled from 'styled-components'

export const Modal = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(42, 42, 42, 0.3);
  padding: 2rem;
  `

export const ModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
`

export const ModalContent = styled.div`
  display: grid;
  grid-template-rows: 30px auto 30px;
  padding: 2em 1.8em;
  width: 700px;
  height: calc(100% - 5rem);
  max-width: 100%;
  max-height: 100%;
  background-color: white;
  box-shadow: 0 0 10px rgba(42, 42, 42, 0.3);
  border-radius: 0.25rem;
  overflow-y: scroll !important;
  -webkit-overflow-scrolling: touch;
`

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
`

export const ModalTitle = styled.div`
  margin: 0;
`

export const ModalBody = styled.div`
  padding: 10px;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
`

