import { GlobalContext } from "../../context/global/GlobalContext";
import { useState, useEffect, useContext } from "react";
import "./css/NewComment.css";

const NewComment = ({ postID }) => {
  const { loginEmail, loginName } = useContext(GlobalContext);

  const [formData, setFormData] = useState({
    commentName: "",
    commentText: "",
  });
  const [error, setError] = useState("");
  // ---------------------------------

  useEffect(() => {
    const interval = setInterval(() => {
      setError("");
    }, 2000);
    return () => {
      // Cleanup
      clearInterval(interval);
    };
  }, [error]);
  // ---------------------------------

  const inputChange = (e) => {
    const { name, value } = e.target;

    const regex =
      /^[a-zA-Z0-9.,?!/+*()\säöüßáčďéěíňóřšťúůýžÄÖÜßÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ-]*$/;

    if (
      (name === "commentName" || name === "commentText") &&
      !regex.test(value)
    ) {
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
      fetch("http://localhost:5000/save-comment", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          postId: postID,
          name: formData.commentName,
          email: loginEmail,
          body: formData.commentText,
        }),
      })
        .then((data) => {
          return data.json();
        })
        .then((finaldata) => {
          if (finaldata && finaldata.success) {
            setError("Komentář Přidán");
            setFormData({
              commentName: "",
              commentText: "",
            });
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
  // ---------------------------------
  return (
    <div className="NewComment">
      <h1>Přidat Komentář</h1>
      <input
        type="text"
        name="commentName"
        value={formData.commentName}
        onChange={inputChange}
        placeholder="Jméno Komentáře"
        className="commentName"
      />
      <h2>{loginName}</h2>
      <textarea
        name="commentText"
        value={formData.commentText}
        onChange={inputChange}
        placeholder="Text komentáře"
      />
      <div className="submit-box">
        <p
          style={{
            color: error === "Komentář Přidán" ? "green" : "rgb(184, 18, 18)",
          }}
        >
          {error}
        </p>
        <input type="submit" onClick={btnSubmit} value="Přidat článek" />
      </div>
    </div>
  );
};

export default NewComment;
