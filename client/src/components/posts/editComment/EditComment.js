import { useState } from "react"
import PutComment from "./PutComment"

const EditComment = ({_id, postId, name, body, email}) => {
    const [edit,setEdit] = useState({
        name: name,
        body: body
    })

    const inputChange = (e) => {
        const {name,value} = e.target
    
        setEdit((prevState) => ({
            ...prevState,
            [name]: value,
          }));
      }
  return (
    <div>
        <input type="text" name="name" value={edit.name} onChange={inputChange} />
        <input type="text" name="body" value={edit.body} onChange={inputChange}  />
        <PutComment _id={_id} name={edit.name} body={edit.body} email={email} postId={postId} />
    </div>
  )
}

export default EditComment