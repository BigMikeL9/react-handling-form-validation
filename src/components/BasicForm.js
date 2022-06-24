import styled from "styled-components";
import { FormControl, FormActions, ControlGroup, Button } from "./FormStyled";

const FormControlBasic = styled(FormControl)`
  min-width: 15rem;
  flex: 1;
`;

const BasicForm = (props) => {
  return (
    <form>
      <ControlGroup>
        <FormControlBasic>
          <label htmlFor="name">First Name</label>
          <input type="text" id="name" />
        </FormControlBasic>

        <FormControlBasic>
          <label htmlFor="name">Last Name</label>
          <input type="text" id="name" />
        </FormControlBasic>
      </ControlGroup>

      <FormControlBasic>
        <label htmlFor="name">E-Mail Address</label>
        <input type="text" id="name" />
      </FormControlBasic>

      <FormActions>
        <Button>Submit</Button>
      </FormActions>
    </form>
  );
};

export default BasicForm;
