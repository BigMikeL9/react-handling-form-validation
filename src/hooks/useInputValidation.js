import React, { useState } from "react";

//  A custom-Hook that validates individual Input components
const useInputValidation = (validateValue_Fn) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateValue_Fn(enteredValue);
  const hasError = !valueIsValid && isTouched;

  // ===== 🥬 On every keystroke --> Input VALIDATION =====
  const inputChangeHandler = (event) => {
    setEnteredValue(event.target.value);
    setIsTouched(true);
  };

  // ===== 🍁 On input lose FOCUS --> Input VALIDATION =====
  const inputBlurHandler = () => {
    setIsTouched(true);
  };

  // -- Reset input upon submission
  const reset = () => {
    setEnteredValue("");
    setIsTouched(false);
  };

  return {
    enteredValue,
    valueIsValid,
    hasError,
    inputChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInputValidation;
