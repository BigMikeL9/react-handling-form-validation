import SimpleInput from "./components/SimpleInput";
import BasicForm from "./components/BasicForm";
import BasicFormuseReducer from "./components/BasicFormReducer";
import styled from "styled-components";

const AppStyled = styled.div`
  width: 90%;
  max-width: 43rem;
  padding: 1rem;
  border-radius: 12px;
  background-color: white;
  margin: 3rem auto;
`;

function App() {
  return (
    <AppStyled>
      {/* <SimpleInput /> */}
      {/* <BasicForm /> */}
      <BasicFormuseReducer />
    </AppStyled>
  );
}

export default App;
