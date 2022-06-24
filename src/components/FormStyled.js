import styled from "styled-components";

export const FormControl = styled.div`
  margin-bottom: 1rem;

  & input,
  & label {
    display: block;
  }

  & label {
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  & input,
  & select {
    font: inherit;
    padding: 0.5rem;
    border-radius: 4px;
    border: 1px solid ${(props) => (props.inValid ? "#b40e0e" : "#ccc")};
    background-color: ${(props) => props.inValid && "#fddddd"};
    width: 20rem;
    max-width: 100%;
  }

  & input:focus {
    outline: none;
    border-color: ${(props) => (props.inValid ? "#ff8800" : "#240370")};
    background-color: ${(props) => (props.inValid ? "#fbe8d2" : "#e0d4fd")};
  }
`;

export const FormActions = styled.div`
  text-align: right;

  & button {
    margin-left: 1rem;
  }
`;

export const ControlGroup = styled.div`
  display: flex;
  column-gap: 1rem;
  flex-wrap: wrap;
`;

export const Button = styled.button`
  font: inherit;
  background-color: #240370;
  color: white;
  border: 1px solid #240370;
  padding: 0.5rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;

  &:hover,
  &:active {
    background-color: #33059e;
    border-color: #33059e;
  }
`;
