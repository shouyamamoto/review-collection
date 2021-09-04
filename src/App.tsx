import { useEffect } from 'react'
import { auth } from "./firebase"
import { login, logout } from "./features/users/userSlice"
import { useDispatch } from "react-redux"
import { Home } from "./Home"
import { Auth } from "./Auth"
import { Header } from "./Header"
import { BrowserRouter, Route } from "react-router-dom"
import { Reset } from 'styled-reset'

const App: React.VFC = () => {
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

  return (
    <>
      <Reset />
      <BrowserRouter>
        <Header />
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/login">
          <Auth />
        </Route>
      </BrowserRouter>
    </>
  )
}

export default App
