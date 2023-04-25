import { ChangeEvent, FormEvent, useState } from "react"
import { uploadFile } from "../controllers/uploadFile"

function App() {

const [formData, setFormData] = useState<File>()
const [returnLink, setReturnLink] = useState("");


const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
  if (!event.target.files) return;
  setFormData(event.target.files[0])
}

const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formData) return;
    const response = await uploadFile(formData);
    const uploadedUID = response.data.uid

    setReturnLink(`http://localhost:3000/${uploadedUID}`)
  }


  return (
    <>
      <h1>ewan</h1> 

      <form onSubmit={handleSubmit}>
        <input type="file" name="file" onChange={handleFileSelect} />
        <br />
        <input type="submit" value="Upload" />
      </form>
      <a href={returnLink}>{returnLink}</a>
    </>
  )
  }

export default App
