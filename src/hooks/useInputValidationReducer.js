import React, { useReducer } from "react";

/* Does same thing as 'useInputValidation' custom hook, but using 'useReducer' instead of 'useState' to manage the state of the input. Just for practice, 'useReducer' is unnecessary here.*/

// ---------------------------
const initialInputState = { value: "", isTouched: false };

const inputStateReducer = (state, action) => {
  console.log(action);
  console.log(state.isTouched);

  if (action.type === "INPUT") {
    return {
      value: action.value,
      isTouched: state.isTouched,
      // 👆👆 If we put 'isTouched: true' then add space in input field, user will get message that their input is invalid before they blur the input field, which is not the best practice to inform users about invalid input before they are finished typing.
    };
  }

  if (action.type === "BLUR") {
    return {
      value: state.value,
      isTouched: true,
    };
  }

  if (action.type === "RESET") {
    return {
      value: "",
      isTouched: false,
    };
  }

  return initialInputState;
};

// ---------------------------

//  A custom-Hook that validates individual Input components
const useInputValidationReducer = (validateValue_Fn) => {
  const [inputState, inputStateDispatch] = useReducer(
    inputStateReducer,
    initialInputState
  );

  const valueIsValid = validateValue_Fn(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  // ===== 🥬 On every keystroke --> Input VALIDATION =====
  const inputChangeHandler = (event) => {
    inputStateDispatch({
      type: "INPUT",
      value: event.target.value,
    });
  };

  // ===== 🍁 On input lose FOCUS --> Input VALIDATION =====
  const inputBlurHandler = () => {
    inputStateDispatch({ type: "BLUR" });
  };

  // -- Reset input upon submission
  const reset = () => {
    inputStateDispatch({ type: "RESET" });
  };

  return {
    enteredValue: inputState.value,
    valueIsValid: valueIsValid,
    hasError: hasError,
    inputChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInputValidationReducer;
