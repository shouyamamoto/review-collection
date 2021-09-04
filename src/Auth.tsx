import { auth, githubProvider, googleProvider } from "./firebase"
import { FaGithub, FaGoogle } from "react-icons/fa"
// import { AiOutlineUpload } from "react-icons/ai"

export const Auth = () => {
  const signIn = async (provider: any) => {
    await auth.signInWithPopup(provider)
      .then(result => {
        console.log(result.user)
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div>
      <button onClick={() => signIn(githubProvider)}><FaGithub /> Githubでログインする</button>
      <button onClick={() => signIn(googleProvider)}><FaGoogle /> Googleでログインする</button>
    </div>
  )
}
