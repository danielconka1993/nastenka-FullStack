const DeletePost = ({ postID, loginEmail }) => {

  const btnSubmit = async () => {
    try {
      const response = await fetch('http://localhost:5000/delete-post', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          _id: postID,
          autorEmail: loginEmail,
        }),
      });

      const data = await response.json();

      if (data.success) {
        console.log('Příspěvek byl úspěšně smazán');
        // Zde můžete provést další akce, například aktualizaci seznamu příspěvků ve vaší aplikaci.
      } else {
        console.error('Chyba při mazání příspěvku:', data.msg);
      }
    } catch (error) {
      console.error('Chyba při provádění požadavku:', error);
    }
  };

  return (
    <button onClick={btnSubmit}>Smazat</button>
  );
};

export default DeletePost;