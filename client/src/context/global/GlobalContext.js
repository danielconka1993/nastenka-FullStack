import { useReducer, createContext } from "react";
import GlobalReducer from "./GlobalReducer";

const mainState = {
  // Globalní Reducer - Defaultni state
  visibilitRegistrationForm: false, // registrationForm

  visibilitLoginForm: false, // loginFORM

  login: false, // loginOK

  loginID: "", // loginData
  loginEmail: "",
  loginName: "",
};

export const GlobalContext = createContext(); // Context - vytvoření

// -----------------------------
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(GlobalReducer, mainState);

  const registrationForm = (visibilitRegistrationForm) => {
    // Reg Form - vis.
    dispatch({
      type: "REGISTRATION_FORM",
      payload: visibilitRegistrationForm,
    });
  };

  const loginForm = (visibilitLoginForm) => {
    // Login Form - vis.
    dispatch({
      type: "LOGIN_FORM",
      payload: visibilitLoginForm,
    });
  };

  const loginOK = (login) => {
    // LOGIN - ok/no
    dispatch({
      type: "LOGIN_OK",
      payload: login,
    });
  };

  const loginData = (loginID, loginEmail, loginName) => {
    dispatch({
      type: "LOGIN_DATA",
      payload: {
        loginID,
        loginEmail,
        loginName,
      },
    });
  };

  return (
    <GlobalContext.Provider // Context - vypis
      value={{
        // Reduce for context
        registrationForm,
        visibilitRegistrationForm: state.visibilitRegistrationForm,

        loginForm,
        visibilitLoginForm: state.visibilitLoginForm,

        loginOK,
        login: state.login,

        loginData,
        loginID: state.loginID,
        loginEmail: state.loginEmail,
        loginName: state.loginName,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
