import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./css/OnePost.css";
import AutorDetails from "./AutorDetails";
import NewComment from "./NewComment";
import GetComments from "./GetComments";

const OnePost = () => {
  const { postID } = useParams();
  const [post, setPost] = useState({});
  const [post2, setPost2] = useState({});
  const [postAuthor, setPostAuthor] = useState({});
  const [comments, setComments] = useState([]);
  const [autorVisibility, setAutorVisibility] = useState(false);

  useEffect(() => {
    if (postID <= 100) {
      const getPost = async () => {
        try {
          const [postResponse, usersResponse, commentsResponse] =
            await Promise.all([
              fetch(`https://jsonplaceholder.typicode.com/posts/${postID}`),
              fetch("https://jsonplaceholder.typicode.com/users"),
              fetch("https://jsonplaceholder.typicode.com/comments"),
            ]);

          const postData = await postResponse.json();
          const usersData = await usersResponse.json();
          const commentsData = await commentsResponse.json();

          const user = usersData.find((user) => user.id === postData.userId);
          const postComments = commentsData.filter(
            (comment) => comment.postId === postData.id
          );

          setPost({
            ...postData,
            userName: user ? user.name : "Neznámý uživatel",
          });

          setPostAuthor(user);
          setComments(postComments.reverse());
        } catch (error) {
          console.error("Chyba při načítání dat:", error);
        }
      };

      getPost();
    } else {
      const getPost2 = async () => {
        try {
          const response = await fetch("http://localhost:5000/get-posts");
          const { posts } = await response.json();
          const postData = posts.find((post) => post._id === postID);
          setPost2(postData);
        } catch (error) {
          console.error("Chyba při načítání dat2:", error);
        }
      };

      getPost2();
    }
  }, [postID]);

  return (
    <section className="OnePost-box">
      <Link to="/" className="linkHome">
        <button className="linkHome">Zpět na hlavní stránku</button>
      </Link>

      {
        // For Post
        postID <= 100 ? (
          <div className="OnePost">
            <h1>{post.title}</h1>
            <h2 onClick={() => setAutorVisibility(!autorVisibility)}>
              {post.userName}
            </h2>
            {autorVisibility && postAuthor && (
              <AutorDetails postAuthor={postAuthor} className="AutorDetails" />
            )}

            <p className="wholeText">Celý text</p>
            <p>{post.body}</p>

            <article className="commentsBox">
              <h3>Komentáře:</h3>
              <div className="comments">
                {comments.map((oneComment) => {
                  return (
                    <div className="oneComment" key={oneComment.id}>
                      <p>{oneComment.name}</p>
                      <p>{oneComment.email}</p>
                      <p>{oneComment.body}</p>
                    </div>
                  );
                })}
              </div>
            </article>
          </div>
        ) : (
          // Pro Post2
          <div className="OnePost">
            <h1>{post2 && post2.postName}</h1>
            <h2>{post2 && post2.autorName}</h2>
            <p className="wholeText">{post2 && "Celý text"}</p>
            <p>{post2 && post2.postText}</p>
            {post2 && <NewComment postID={postID} /> }
            <GetComments postID={postID} />
            {!post2 && <p className="NoExist">Neexistující Článek</p>}
          </div>
        )
      }
    </section>
  );
};

export default OnePost;
