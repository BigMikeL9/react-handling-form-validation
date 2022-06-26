import React, { useState, useRef, useEffect } from "react";
import { FormControl, FormActions, Button, ErrorMsg } from "./FormStyled";

/* Fetching User Input 👇
      Two Ways: 
                1. using 'useState' [Controlled Input/Component]
                    Listening to every keystroke and store the value in a state
                2. using 'useRef'   [UnControlled Input/Component]
                    Fetch the Input once the user is done typing a value
                    ['useRef' is RARELY USED 👆]

  Input Validation: 1. 📩 When Form is submitted
                    2. 🍁 When input loses focus
                    3. 🥬 On every keystroke / As user enters Input

    // ----------------
  📝 Validation SideNote 👇 
     - We shouldn't just Validate in the browser, its great for user experience, but we should ALWAYS validate the input on the server when form is submitted. 
     - ⭐ Because code in the browser can always be edited in the browser,  so validating input in the browser is not reliable, just good for user experience.

    //  ---------------
     -- Why NOT use the 'required' attribute in Inputs for Validation?
     The reason for not using the required attribute here is that we don't want the default HTML form validation for our form. We want to define our own custom form validation which we do in this section, so we don't want the default HTML validation that we get from the required attribute to come in the way.

Both are client side validations (the one that we get from required and the other that we as developers write). By writing our own validation logic, we get more control and we can even write more sophisticated validations which is not possible with default validation that we get with required attribute.

To conclude, I prefer to write my own custom validation logic or use some custom library for form-validation like Formik or many others like it.
    
*/

const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredNameIsValid, setEnteredNameIsValid] = useState(null);

  const inputRef = useRef();

  // ===== Overall FORM Validation =====
  const formIsValid = enteredNameIsValid;

  // ----------
  const inputChangeHandler = (event) => {
    // 🟡 -- using 'useState' --
    const enteredInput = event.target.value;
    setEnteredName(enteredInput);

    // ===== 🥬 On every keystroke --> Input VALIDATION =====
    if (enteredInput.trim().length !== 0) setEnteredNameIsValid(true);
  };

  // ----------
  // ===== 🍁 On input lose FOCUS --> Input VALIDATION =====
  const inputBlurHandler = () => {
    if (enteredName.trim().length === 0) setEnteredNameIsValid(false);
  };

  // ----------
  //  ===== 📩  On form SUBMIT --> Input VALIDATION =====
  const submitHandler = (event) => {
    event.preventDefault();

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
    setEnteredName("");

    // --- Send to Data to Backend
    console.log(enteredName);
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
          onBlur={inputBlurHandler}
          value={enteredName}
        />
        {enteredNameIsValid === false && (
          <ErrorMsg>Please Enter a Valid Name!</ErrorMsg>
        )}
      </FormControl>

      <FormActions>
        <Button type="submit" disabled={!formIsValid}>
          Submit
        </Button>
      </FormActions>
    </form>
  );
};

export default SimpleInput;
