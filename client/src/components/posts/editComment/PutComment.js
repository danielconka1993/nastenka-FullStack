import React from 'react'

const PutComment = ({_id, postId, email, name, body}) => {
    const btnSubmit = async () => {
        try {
            const response = await fetch("http://localhost:5000/put-comment", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    _id: _id,
                    postId: postId,
                    name: name,
                    email: email,
                    body: body
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
        <button onClick={btnSubmit}>PutComment</button>
    );
}

export default PutComment