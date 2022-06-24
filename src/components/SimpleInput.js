import { FormControl, FormActions, Button } from "./FormStyled";

const SimpleInput = (props) => {
  return (
    <form>
      <FormControl>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" />
      </FormControl>

      <FormActions>
        <Button>Submit</Button>
      </FormActions>
    </form>
  );
};

export default SimpleInput;
