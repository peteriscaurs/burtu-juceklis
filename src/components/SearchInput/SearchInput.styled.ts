import styled from 'styled-components'

export const Wrapper = styled.div`
  max-width: 512px;
  text-align: left;
  margin: 0 auto;
  padding: 0 2rem 2rem 2rem;
  /* margin-bottom: 0.5rem; */
`

export const InputWrapper = styled.div`
  height: 40px;
  display: flex;
`;

export const TextInput = styled.input`
  &:focus {
    outline: none;
    box-shadow: 0 0 10px #e4e4e4;
  }
  padding: 0.5rem;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  border-radius: 5px 0 0 5px;
  border: none;
`;

export const Button = styled.button`
  border-radius: 0 5px 5px 0;
  height: 100%;
  width: 4rem;
  border: none;
  font-weight: bold;
  color: #fafafa;
  background: linear-gradient(
    90deg,
    rgba(131, 58, 180, 1) 0%,
    rgba(253, 29, 29, 1) 50%,
    rgba(252, 176, 69, 1) 100%
  );
  box-sizing: border-box;
  cursor: pointer;
`;

export const ValidationCopy = styled.span`
  color: rgba(253, 29, 29, 0.7);
  font-size: 80%;
  position: absolute;
`