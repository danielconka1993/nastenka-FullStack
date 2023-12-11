import "./css/Error.css";
import { HiHome } from "react-icons/hi";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="error">
      <h1>404</h1>
      <br />
      <p>Stránka nebyla nalezena</p>
      <br />
      <p>Vratit na hlavni stránku</p>
      <br />
      <Link to="/">
        <HiHome className="icon-home" />
      </Link>
    </div>
  );
};

export default Error;
