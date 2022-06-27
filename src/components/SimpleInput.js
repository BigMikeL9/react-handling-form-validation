import React, { useState, useRef } from "react";
import { FormControl, FormActions, Button, ErrorMsg } from "./FormStyled";
import useInputValidation from "../hooks/useInputValidation";

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

const SimpleInput = () => {
  // const [enteredName, setEnteredName] = useState("");
  // const [enteredNameIsTouched, setEnteredNameIsTouched] = useState(false);
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [enteredEmailIsTouched, setEnteredEmailIsTouched] = useState(false);

  // const enteredNameIsValid = enteredName.trim().length !== 0;
  // const enteredNameIsInvalid = !enteredNameIsValid && enteredNameIsTouched;
  // const enteredEmailIsValid = enteredEmail.trim().includes("@");
  // const enteredEmailIsInValid = !enteredEmailIsValid && enteredEmailIsTouched;

  // -- input validation is handled using 'useInputValidation' custom hook 👇
  const {
    enteredValue: enteredName,
    valueIsValid: enteredNameIsValid,
    hasError: nameInputHasError,
    inputChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInputValidation((enteredValue) => enteredValue.trim().length !== 0);

  const {
    enteredValue: enteredEmail,
    valueIsValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    inputChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInputValidation((enteredValue) => enteredValue.trim().includes("@"));

  const nameInputRef = useRef();
  const emailInputRef = useRef();

  // ----------------------------------------
  // ===== Overall FORM Validation =====
  const formIsValid = enteredNameIsValid && enteredEmailIsValid;

  // ----------------------------------------
  // ===== 🥬 On every keystroke --> Input VALIDATION =====
  // const nameChangeHandler = (event) => {
  // 🟡 -- using 'useState' --
  //   const enteredInput = event.target.value;
  //   setEnteredName(enteredInput);
  //   setEnteredNameIsTouched(true);
  // };

  // const emailChangeHandler = (event) => {
  // 🟡 -- using 'useState' --
  //   const enteredInput = event.target.value;
  //   setEnteredEmail(enteredInput);
  //   setEnteredEmailIsTouched(true);
  // };

  // ----------------------------------------
  // ===== 🍁 On input lose FOCUS --> Input VALIDATION =====
  // const nameBlurHandler = () => {
  //   setEnteredNameIsTouched(true);
  // };

  // const emailBlurHandler = () => {
  //   setEnteredEmailIsTouched(true);
  // };

  // ----------------------------------------
  //  ===== 📩  On form SUBMIT --> Input VALIDATION =====
  const submitHandler = (event) => {
    event.preventDefault();

    // -- safe-guard incase user enables submit button from dev tools
    if (!formIsValid) return;

    // setEnteredNameIsTouched(false);
    // setEnteredEmailIsTouched(false);
    // setEnteredName("");
    // setEnteredEmail("");

    resetNameInput();
    resetEmailInput();

    // --- Send to Data to Backend
    console.log(enteredName);
  };

  // -------
  return (
    <form onSubmit={submitHandler}>
      <FormControl isValid={!nameInputHasError}>
        <label htmlFor="name">Your Name:</label>
        <input
          ref={nameInputRef}
          type="text"
          id="name"
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          value={enteredName}
        />
        {nameInputHasError && <ErrorMsg>Please Enter a Valid Name!</ErrorMsg>}
      </FormControl>

      <FormControl isValid={!emailInputHasError}>
        <label htmlFor="email">Your Email:</label>
        <input
          ref={emailInputRef}
          type="email"
          id="email"
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          value={enteredEmail}
        />
        {emailInputHasError && (
          <ErrorMsg>Please Enter a Valid Email Address!</ErrorMsg>
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
