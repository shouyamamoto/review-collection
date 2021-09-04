import { useEffect } from 'react'
import { auth, githubProvider, googleProvider } from "./firebase"
import { login, logout } from "./features/users/userSlice"
import { useDispatch } from "react-redux"

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    const unSub = auth.onAuthStateChanged(authUser => {
      if(authUser) {
        dispatch(login({
          uid: authUser.uid,
          displayName: authUser.displayName,
          photoUrl: authUser.photoURL,
        }))
      } else {
        dispatch(logout())
      }
    })
    return () => unSub()
  }, [dispatch])
  
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
