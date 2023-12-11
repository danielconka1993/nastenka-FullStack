import React, { useState, useEffect } from "react";

const GetComments = ({ postID }) => {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/get-comment?postId=${postID}`
        );
        const data = await response.json();

        if (data && data.comments) {
          setComments(data.comments.reverse());
        } else {
          setError("Chyba při načítání komentářů. Kontaktujte Nás.");
        }
      } catch (error) {
        console.error("Error při Get komentářů: ", error);
        setError("Chyba při načítání komentářů. Kontaktujte Nás.");
      }
    };

    fetchComments();
  }, [postID]);

  return (
    <article className="commentsBox">
      <h3>{comments.length > 0 ? "Komentáře" : ""}</h3>
      <div className="comments">
        {comments.map((oneComment) => {
          return (
            <div key={oneComment._id} className="oneComment">
              <p>{oneComment.name}</p>
              <p>{oneComment.email}</p>
              <p>{oneComment.body}</p>
            </div>
          );
        })}
        <p style={{ color: "red" }}>{error}</p>
      </div>
    </article>
  );
};

export default GetComments;