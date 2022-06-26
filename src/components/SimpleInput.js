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
  const [enteredInput, setEnteredInput] = useState("");
  const [inputIsValid, setInputIsValid] = useState(true);
  const [inputIsFocused, setInputIsFocused] = useState();

  const inputRef = useRef();

  const inputChangeHandler = (event) => {
    // 🟡 -- using 'useState' --
    const enteredInput = event.target.value;
    setEnteredInput(enteredInput);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    /* We shouldn't just Validate in the browser, its great for user experience, but we should ALWAYS validate the input on the server when form is submitted. 
    ⭐ Because code in the browser can always be edited in the browser, so validating input in the browser is not reliable, just good for user experience.
    */
    //  ==== VALIDATION ====
    if (enteredInput.trim().length === 0) {
      setInputIsValid(false);
      inputRef.current.focus();
      return; // Don't execute rest of code
    }

    // ------------------------
    // 🟠 -- using 'useRef' --
    // const enteredInput = inputRef.current.value;
    // inputRef.current.value = "";  // 👈  Not good practice when using React since we are directly manipulating the DOM here.
    // ------------------------

    setInputIsValid(true);
    console.log(enteredInput);
    setEnteredInput("");
  };

  return (
    <form onSubmit={submitHandler}>
      <FormControl isValid={inputIsValid}>
        <label htmlFor="name">Your Name</label>
        <input
          ref={inputRef}
          type="text"
          id="name"
          onChange={inputChangeHandler}
          value={enteredInput}
        />
        {!inputIsValid && <ErrorMsg>Please Enter a Valid Name!</ErrorMsg>}
      </FormControl>

      <FormActions>
        <Button type="submit">Submit</Button>
      </FormActions>
    </form>
  );
};

export default SimpleInput;
