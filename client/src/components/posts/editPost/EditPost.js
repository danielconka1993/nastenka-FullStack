import { useState } from "react"
import PutPost from "./PutPost"

const EditPost = ({postName, postText, autorEmail, _id}) => {
  const [postEdit, setPostEdit] = useState({
    name: postName,
    text: postText
  })

  const inputChange = (e) => {
    const {name,value} = e.target

    setPostEdit((prevState) => ({
        ...prevState,
        [name]: value,
      }));
  }

  return (
    <div>
        <input type="text" name="name" value={postEdit.name} onChange={inputChange} />
        <input type="text" name="text" value={postEdit.text} onChange={inputChange}  />
        <PutPost postName={postEdit.name} postText={postEdit.text} autorEmail={autorEmail} postID={_id} />
    </div>
  )
}

export default EditPost