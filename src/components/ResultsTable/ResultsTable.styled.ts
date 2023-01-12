import styled from 'styled-components'

export const Wrapper = styled.div`
  height: 380px;
  max-width: 700px;
  padding: 0 2rem 2rem 2rem ;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin: 0 auto;
`

export const NoResults = styled.div`
  color: rgba(253, 29, 29, 0.7);
`

export const Table = styled.table`
  width: 100%;
  background-color: #fafafa;
  table-layout: fixed;
  border-collapse: collapse;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
  border-radius: 0.25rem;
  `;

export const Th = styled.th`
  padding: 0.5rem 0 0.5rem 0;
  word-break: break-word;
`

export const Row = styled.tr`
  @media (hover: hover) {
    &:hover {
    background-color: rgba(131, 58, 180, 0.1);
  }
  }
  &:last-child td:first-child {
  padding-bottom: 0.5rem;
  }
  td {
    word-break: break-word;
  }
  `

export const TBody = styled.tbody`
  &:hover {
    cursor: pointer;
  }
`