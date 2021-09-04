import { useEffect } from 'react'
import { auth } from "./firebase"
import { login, logout, selectUser } from "./features/users/userSlice"
import { useDispatch, useSelector } from "react-redux"
import { Home } from "./Home"
import { Auth } from "./Auth"

const App: React.VFC = () => {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)

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

  return (
    <>
    { user.uid 
      ? <Home />
      : <Auth />
    }
    </>
  )
}

export default App
