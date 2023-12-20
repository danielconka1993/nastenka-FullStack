const PutPost = ({ postID, autorEmail, postName, postText }) => {
    const btnSubmit = async () => {
        try {
            const response = await fetch("http://localhost:5000/put-post", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    _id: postID,
                    autorEmail: autorEmail,
                    postName: postName,
                    postText: postText
                })
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data.msg); // Výpis zprávy z serveru
            } else {
                console.error('Chyba při provádění požadavku:', response.statusText);
            }
        } catch (err) {
            console.error('Chyba při provádění požadavku:', err);
        }
    }

    return (
        <button onClick={btnSubmit}>PutPost</button>
    );
}

export default PutPost;