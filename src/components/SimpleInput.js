import React, { useState, useRef } from "react";
import { FormControl, FormActions, Button, ErrorMsg } from "./FormStyled";

/* Fetching User Input 👇
      Two Ways: 
                1. using 'useState' [Controlled Input/Component]
                    Listening to every keystroke and store the value in a state
                2. using 'useRef'   [UnControlled Input/Component]
                    Fetch the Input once the user is done typing a value
                    ['useRef' is RARELY USED 👆]
*/

const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredNameIsValid, setEnteredNameIsValid] = useState(true);

  const inputRef = useRef();

  const inputChangeHandler = (event) => {
    // 🟡 -- using 'useState' --
    const enteredInput = event.target.value;
    setEnteredName(enteredInput);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    /* We shouldn't just Validate in the browser, its great for user experience, but we should ALWAYS validate the input on the server when form is submitted. 
    ⭐ Because code in the browser can always be edited in the browser, so validating input in the browser is not reliable, just good for user experience.
    */
    //  ==== VALIDATION ====
    if (enteredName.trim().length === 0) {
      setEnteredNameIsValid(false);
      inputRef.current.focus();
      return; // Don't execute rest of code
    }

    // ------------------------
    // 🟠 -- using 'useRef' --
    // const enteredInput = inputRef.current.value;
    // inputRef.current.value = "";  // 👈  Not good practice when using React since we are directly manipulating the DOM here.
    // ------------------------

    setEnteredNameIsValid(true);
    console.log(enteredName);
    setEnteredName("");
  };

  return (
    <form onSubmit={submitHandler}>
      <FormControl isValid={enteredNameIsValid}>
        <label htmlFor="name">Your Name</label>
        <input
          ref={inputRef}
          type="text"
          id="name"
          onChange={inputChangeHandler}
          value={enteredName}
        />
        {!enteredNameIsValid && <ErrorMsg>Please Enter a Valid Name!</ErrorMsg>}
      </FormControl>

      <FormActions>
        <Button type="submit">Submit</Button>
      </FormActions>
    </form>
  );
};

export default SimpleInput;
