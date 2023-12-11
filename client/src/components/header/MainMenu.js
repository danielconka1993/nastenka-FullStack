import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../context/global/GlobalContext";
import FormRegistration from "./FormRegistration";
import FormLogin from "./FormLogin";
import "./css/MainMenu.css";

const MainMenu = () => {
  const [localStoragee, setLocalStoragee] = useState("");

  const {
    // Registrace FORM
    visibilitRegistrationForm,
    registrationForm,

    // Login FORM
    visibilitLoginForm,
    loginForm,

    // Login OK
    loginOK,
    login,

    // Login Data from LocalStorage
    loginData,
  } = useContext(GlobalContext);

  // --------------------------------------------------------------
  const f_regFormVisib = () => {
    registrationForm(true);
    loginForm(false);
  };

  const f_logFormVisib = () => {
    loginForm(true);
    registrationForm(false);
  };

  // ------------------------------------------------------------------------
  // dat z localStorage + při změně
  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      // Když data v localStorage
      const userData = JSON.parse(storedUserData);

      setLocalStoragee(userData);
      loginOK(true);
      loginData(userData._id, userData.email, userData.name);
    } else {
      setLocalStoragee("");
      // Pro ignorování nesmyslného warningu
    }// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [login]); 

  const logOut = () => {
    loginOK(false);
    setLocalStoragee("");
    localStorage.clear();
  };

  // -------------------------------------------------------
  return (
    <nav>
      <Link to="/">
        <button>Domu</button>
      </Link>

      {localStoragee && <p>{localStoragee.name}</p>}
      {/* Reg. + Log. FORM */}
      {!localStoragee && (
        <div>
          <button onClick={f_logFormVisib}>Přihlásit</button>
          <button onClick={f_regFormVisib}>Registrovat</button>
        </div>
      )}
      {/* LogOut */}
      {localStoragee && <button onClick={logOut}>Odhlásit</button>}
      {/* ------------ */}
      {visibilitRegistrationForm && <FormRegistration />}
      {visibilitLoginForm && <FormLogin />}
    </nav>
  );
};

export default MainMenu;
