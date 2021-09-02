import React from 'react'
import { auth, githubProvider, googleProvider } from "./firebase"

const App = () => {
  const signInGithub = async () => {
    auth.signInWithPopup(githubProvider)
      .then(result => {
        console.log(result.user)
      })
      .catch(err => {
        console.log(err)
      })
  }
  const signInGoogle = async () => {
    auth.signInWithPopup(googleProvider)
      .then(result => {
        console.log(result.user)
      })
      .catch(err => {
        console.log(err)
      })
  }
  const signOut = () => {
    auth.signOut()
    console.log("signOut")
  }

  return (
    <div>
      <button onClick={signInGithub}>Githubでログインする</button>
      <button onClick={signInGoogle}>Googleでログインする</button>
      <button onClick={signOut}>ログアウト</button>
    </div>
  )
}

export default App
