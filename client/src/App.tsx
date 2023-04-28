import { ChangeEvent, FormEvent, useState } from "react"
import { uploadFile } from "../controllers/uploadFile"
import QRCode from "react-qr-code";
import LoginButton from "../components/Login"
import LogoutButton from "../components/Logout"
import Profile from "../components/Profile"

function App() {

const [file, setFile] = useState<File>()
const [returnLink, setReturnLink] = useState("");


const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
  if (!event.target.files) return;
  setFile(event.target.files[0])
}

const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) return;
    const response = await uploadFile(file);
    const uploadedUID = response.data.uid;

    setReturnLink(`http://localhost:3000/${uploadedUID}`)
  }


  return (
    <>
      <h1>ewan</h1> 

      <LoginButton />
      <LogoutButton />
      <Profile />

      <form onSubmit={handleSubmit}>
        <input type="file" name="file" onChange={handleFileSelect} />
        <br />
        <input type="submit" value="Upload" />
      </form>
      <a href={returnLink}>{returnLink}</a>
      {
        returnLink && <QRCode value={returnLink} />
      }
    </>
  )
  }

export default App
