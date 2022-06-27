import React from "react";
import styled from "styled-components";
import useInputValidationReducer from "../hooks/useInputValidationReducer";
import {
  FormControl,
  FormActions,
  ControlGroup,
  Button,
  ErrorMsg,
} from "./FormStyled";

// ==================================================================

const FormControlBasic = styled(FormControl)`
  min-width: 15rem;
  flex: 1;
`;
// ==================================================================

const nameValidCondition = (enteredValue) => enteredValue.trim().length !== 0;
const emailValidCondition = (enteredValue) => enteredValue.trim().includes("@");

const BasicFormuseReducer = (props) => {
  const {
    enteredValue: enteredFirstName,
    valueIsValid: enteredFirstNameIsValid,
    hasError: enteredFirstNameHasError,
    inputChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
    reset: resetFirstNameInput,
  } = useInputValidationReducer(nameValidCondition);

  const {
    enteredValue: enteredLastName,
    valueIsValid: enteredLastNameIsValid,
    hasError: enteredLastNameHasError,
    inputChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
    reset: resetLastNameInput,
  } = useInputValidationReducer(nameValidCondition);

  const {
    enteredValue: enteredEmail,
    valueIsValid: enteredEmailIsValid,
    hasError: enteredEmailHasError,
    inputChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInputValidationReducer(emailValidCondition);

  // ---------
  const formIsValid =
    enteredFirstNameIsValid && enteredLastNameIsValid && enteredEmailIsValid;

  // ---------
  const submitHandler = (event) => {
    event.preventDefault();

    // -- safe-guard incase user enables submit button from dev tools
    if (!formIsValid) return;

    resetFirstNameInput();
    resetLastNameInput();
    resetEmailInput();

    console.log(
      JSON.stringify(
        { enteredFirstName, enteredLastName, enteredEmail },
        null,
        2
      )
    );
  };

  // ---------
  return (
    <form onSubmit={submitHandler}>
      <ControlGroup>
        <FormControlBasic isValid={!enteredFirstNameHasError}>
          <label htmlFor="first-name">First Name</label>
          <input
            type="text"
            id="first-name"
            value={enteredFirstName}
            onChange={firstNameChangeHandler}
            onBlur={firstNameBlurHandler}
          />
          {enteredFirstNameHasError && (
            <ErrorMsg>Please enter a Valid First Name!</ErrorMsg>
          )}
        </FormControlBasic>

        <FormControlBasic isValid={!enteredLastNameHasError}>
          <label htmlFor="last-name">Last Name</label>
          <input
            type="text"
            id="last-name"
            value={enteredLastName}
            onChange={lastNameChangeHandler}
            onBlur={lastNameBlurHandler}
          />
          {enteredLastNameHasError && (
            <ErrorMsg>Please enter a Valid Last Name!</ErrorMsg>
          )}
        </FormControlBasic>
      </ControlGroup>

      <FormControlBasic isValid={!enteredEmailHasError}>
        <label htmlFor="email">E-Mail Address</label>
        <input
          type="email"
          id="email"
          value={enteredEmail}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
        />
        {enteredEmailHasError && (
          <ErrorMsg>Please enter a Valid Email Address!</ErrorMsg>
        )}
      </FormControlBasic>

      <FormActions>
        <Button type="submit" disabled={!formIsValid}>
          Submit
        </Button>
      </FormActions>
    </form>
  );
};

export default BasicFormuseReducer;
