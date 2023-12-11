const GlobalReducer = (state, action) => {
  switch (action.type) {
    case "REGISTRATION_FORM":
      return {
        ...state,
        visibilitRegistrationForm: action.payload,
      };
    case "LOGIN_FORM":
      return {
        ...state,
        visibilitLoginForm: action.payload,
      };

    case "LOGIN_OK":
      return {
        ...state,
        login: action.payload,
      };

    case "LOGIN_DATA":
      return {
        ...state,
        loginID: action.payload.loginID,
        loginEmail: action.payload.loginEmail,
        loginName: action.payload.loginName,
      };
    default:
      return state;
  }
};

export default GlobalReducer;
