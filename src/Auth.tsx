import { auth, githubProvider, googleProvider } from "./firebase"
import { FaGithub, FaGoogle } from "react-icons/fa"

export const Auth = () => {
  const signIn = async (provider: any) => {
    await auth.signInWithPopup(provider)
      .then(() => {
        window.location.href = "/"
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div>
      <h2>ログイン画面</h2>
      <button onClick={() => signIn(githubProvider)}><FaGithub /> Githubでログインする</button>
      <button onClick={() => signIn(googleProvider)}><FaGoogle /> Googleでログインする</button>
    </div>
  )
}
