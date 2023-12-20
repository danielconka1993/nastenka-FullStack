import React, { useState, useEffect, useContext } from "react";
import DeleteComment from "./DeleteComment";
import { GlobalContext } from "../../context/global/GlobalContext";
import EditComment from "./editComment/EditComment";

const GetComments = ({ postID }) => {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState("");

  const[edit, setEdit] = useState("")

  const {loginEmail} = useContext(GlobalContext) 


  useEffect(() => {
    const fetchComments = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(
          `http://localhost:5000/get-comment?postId=${postID}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
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

    // Edit Show
    const editShow = (postID) => {
      // Když není || jiný objekt edit
      if(!edit || edit !== postID){
        setEdit(postID)
      } 
      else{
        setEdit("")
      }
    }

  return (
    <article className="commentsBox">
      <h3>{comments.length > 0 ? "Komentáře" : ""}</h3>
      <div className="comments">
        {comments.map((oneComment) => {
          return (
            <div key={oneComment._id} className="oneComment">
              {
                // Delete Comment
                oneComment.email === loginEmail && <DeleteComment _id={oneComment._id} postID={oneComment.postId} loginEmail={loginEmail}  />
              }

              {/* Edit POST */}
              {oneComment.email === loginEmail ? <button onClick={() => editShow(oneComment._id)}>Upravit Komentář</button> : ""}

              {
                edit === oneComment._id && <>
                  <EditComment name={oneComment.name} body={oneComment.body} postId={oneComment.postId} email={oneComment.email} _id={oneComment._id}  />
                </>
              }
              {
                edit !== oneComment._id && <>
                  <p>{oneComment.name}</p>
                  <p>{oneComment.email}</p>
                  <p>{oneComment.body}</p>
                </>
              }

            </div>
          );
        })}
        <p style={{ color: "red" }}>{error}</p>
      </div>
    </article>
  );
};

export default GetComments;