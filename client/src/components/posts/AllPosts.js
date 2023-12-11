import { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../../context/global/GlobalContext";
import "./css/AllPosts.css";
import { Link } from "react-router-dom";
import NewPost from "./NewPost";
import NewComment from "./NewComment";
import GetComments from "./GetComments";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [posts2, setPosts2] = useState([]);
  const [showMoreDetails, setShowMoreDetails] = useState({});
  const [showMoreDetails2, setShowMoreDetails2] = useState({});
  const [comments, setComments] = useState([]);
  const [isLog, setIsLog] = useState(false); // for login

  const { login } = useContext(GlobalContext);

  // fetch --------------------------------

  const getPosts = async () => {
    try {
      const [postsResponse, usersResponse, commentsResponse] =
        await Promise.all([
          fetch("https://jsonplaceholder.typicode.com/posts"),
          fetch("https://jsonplaceholder.typicode.com/users"),
          fetch("https://jsonplaceholder.typicode.com/comments"),
        ]);

      const postsData = await postsResponse.json();
      const usersData = await usersResponse.json();
      const commentsData = await commentsResponse.json();

      // Přidání jména uživatele do každého příspěvku
      const postsWithDetails = postsData.map((post) => {
        const user = usersData.find((user) => user.id === post.userId); // uživatele
        const postComments = commentsData.filter(
          (comment) => comment.postId === post.id
        ); // Commenty
        return {
          ...post,
          userName: user ? user.name : "Neznámý uživatel", // Uživatelské jméno
          numberComments: postComments.length, // Počet commentu
        };
      });

      setPosts(postsWithDetails.reverse()); // od posledního
    } catch (error) {
      console.error("Chyba při načítání dat:", error);
    }
  };

  const getPosts2 = async () => {
    // Posts
    try {
      const response = await fetch("http://localhost:5000/get-posts");
      const data = await response.json();
      const { posts } = data;
      setPosts2(posts.reverse());
    } catch (error) {
      console.error("Chyba při načítání dat:", error);
    }
  };

  useEffect(() => {
    // Load JSON
    getPosts();
    getPosts2();
    if (login) {
      // Pokud Přihlašený
      setIsLog(true);
    } else {
      setIsLog(false);
    }
  }, [login]);

  //  Show More Post Details ---------------------
  const toggleShowMore = async (postId) => {
    let isShowing = !showMoreDetails[postId];
    setComments([]);
    setShowMoreDetails({});

    try {
      if (isShowing) {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/comments"
        );
        const commentsData = await response.json();
        const postComments = commentsData.filter(
          (comment) => comment.postId === postId
        );

        setComments(postComments.reverse());
      } else {
        setComments([]);
      }
    } catch (error) {
      console.error("Chyba při načítání komentářů:", error);
    }

    // --------------------------------

    setShowMoreDetails((prevShowMoreDetails) => ({
      ...prevShowMoreDetails,
      [postId]: isShowing,
    }));
  };

  const toggleShowMore2 = (postId) => {
    setShowMoreDetails2((prevShowMoreDetails2) => ({
      ...prevShowMoreDetails2,
      [postId]: !prevShowMoreDetails2[postId],
    }));
  };

  //-------------------------------------------------

  return (
    <section className="AllPosts">
      {isLog && (
        <>
          {/* Front-end piece */}
          {posts.map((onePost) => (
            <article
              key={onePost.id}
              className={`onePost-mini ${
                showMoreDetails[onePost.id] ? "active" : ""
              }`}
            >
              <Link to={`/${onePost.id}`}>
                <h1>{onePost.title}</h1>
              </Link>
              <h2>{onePost.userName}</h2>
              <p>
                {showMoreDetails[onePost.id]
                  ? onePost.body
                  : onePost.body.length > 70
                  ? `${onePost.body.substring(0, 70)}...`
                  : onePost.body}
              </p>

              {/* Comments if ShowMore - Css in OnePost */}
              {comments && showMoreDetails[onePost.id] && (
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
              )}

              {/* ShowMore */}
              <div className="moreInfo-post">
                <button onClick={() => toggleShowMore(onePost.id)}>
                  {showMoreDetails[onePost.id]
                    ? "Skrýt detaily"
                    : "Ukázat více"}
                </button>
                {!showMoreDetails[onePost.id] && (
                  <p>Počet komentářů: {onePost.numberComments}</p>
                )}
              </div>
            </article>
          ))}
          {/* ------------------------------------------------------------------ */}
          {/* Back-end piece */}
          <div className="BackendPosts">
            {posts2 &&
              posts2.map((onePost2) => {
                return (
                  <article
                    key={onePost2._id}
                    className={`onePost-mini ${
                      showMoreDetails[onePost2._id] ? "active" : ""
                    }`}
                  >
                    <Link to={`/${onePost2._id}`}>
                      <h1>{onePost2.postName}</h1>
                    </Link>
                    <h2>{onePost2.autorName}</h2>
                    <p>
                      {showMoreDetails2[onePost2._id]
                        ? onePost2.postText
                        : onePost2.postText.length > 70
                        ? `${onePost2.postText.substring(0, 70)}...`
                        : onePost2.postText}
                    </p>

                    {/* If ShowMore */}
                    <div>
                      {showMoreDetails2[onePost2._id] && (
                        <article>
                          <NewComment postID={onePost2._id} />
                          <GetComments postID={onePost2._id} />
                        </article>
                      )}
                    </div>

                    {/* ShowMore */}
                    <div className="moreInfo-post">
                      <button onClick={() => toggleShowMore2(onePost2._id)}>
                        {showMoreDetails2[onePost2._id]
                          ? "Skrýt detaily"
                          : "Ukázat více"}
                      </button>
                    </div>
                  </article>
                );
              })}
          </div>
          <NewPost />
        </>
      )}
    </section>
  );
};

export default AllPosts;
