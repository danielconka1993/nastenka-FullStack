const DeleteComment = ({_id, postID, loginEmail}) => {
  const btnSubmit = async () => {
    try {
      const response = await fetch('http://localhost:5000/delete-comment', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          _id: _id,
          postId: postID,
          email: loginEmail,
        }),
      });

      const data = await response.json();

      if (data.success) {
        console.log('Komentář byl úspěšně smazán');
        // Zde můžete provést další akce, například aktualizaci seznamu příspěvků ve vaší aplikaci.
      } else {
        console.error('Chyba při mazání příspěvku:', data.msg);
      }
    } catch (error) {
      console.error('Chyba při provádění požadavku:', error);
    }
  };


  return (
    <button onClick={btnSubmit}>Smazat Komentář</button>
  )
}

export default DeleteComment