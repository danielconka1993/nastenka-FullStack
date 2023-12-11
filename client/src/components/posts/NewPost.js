import "./css/NewPost.css";
import { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../../context/global/GlobalContext";

const NewPost = () => {
  const { loginName, loginEmail } = useContext(GlobalContext);

  const [formData, setFormData] = useState({
    postName: "",
    postText: "",
  });
  const [error, setError] = useState("");
  // ---------------------------------

  useEffect(() => {
    const interval = setInterval(() => {
      setError("");
    }, 2000);
    return () => {
      clearInterval(interval);
    };
  }, [error]);
  // ---------------------------------

  const inputChange = (e) => {
    const { name, value } = e.target;

    const regex =
      /^[a-zA-Z0-9.,?!/+*()\säöüßáčďéěíňóřšťúůýžÄÖÜßÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ-]*$/;

    if ((name === "postName" || name === "postText") && !regex.test(value)) {
      setError("Nepovolený znak");
      return;
    }
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const btnSubmit = (e) => {
    e.preventDefault();

    if (Object.values(formData).some((field) => !field)) {
      setError("Vyplňte všechna pole");
      return;
    } else {
      fetch("http://localhost:5000/save-post", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          postName: formData.postName,
          autorName: loginName,
          autorEmail: loginEmail,
          postText: formData.postText,
        }),
      })
        .then((data) => {
          return data.json();
        })
        .then((finaldata) => {
          if (finaldata && finaldata.success) {
            setError("Článek Přidán");
            setFormData({
              postName: "",
              postText: "",
            });
          } else if (finaldata && finaldata.msg) {
            setError(finaldata.msg);
          } else {
            setError("Přidání článku selhalo. Zkuste to znovu.");
          }
        })
        .catch((error) => {
          console.error(error);
          setError("Chyba při odesílání, kontaktujte nás");
        });
    }
  };

  return (
    <div className="NewPost">
      <h1>Nový Článek</h1>
      <input
        type="text"
        name="postName"
        value={formData.postName}
        onChange={inputChange}
        placeholder="Jméno článku"
        className="postName"
      />
      <h2>{loginName}</h2>
      <textarea
        name="postText"
        value={formData.postText}
        onChange={inputChange}
        placeholder="Text článku"
      />
      <div className="submit-box">
        <p
          style={{
            color: error === "Článek Přidán" ? "green" : "rgb(184, 18, 18)",
          }}
        >
          {error}
        </p>
        <input type="submit" onClick={btnSubmit} value="Přidat článek" />
      </div>
    </div>
  );
};

export default NewPost;
