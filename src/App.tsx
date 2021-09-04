import { useEffect } from 'react'
import { auth } from "./firebase"
import { login, logout } from "./features/users/userSlice"
import { useDispatch } from "react-redux"
import { Home } from "./Home"
import { Profile } from "./Profile"
import { Header } from "./Header"
import { BrowserRouter, Route } from "react-router-dom"
import reset from "styled-reset"
import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
  ${reset}
  line-height: 1.6;
`

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
      <GlobalStyle />
      <BrowserRouter>
        <Header />
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/:userId">
          <Profile />
        </Route>
      </BrowserRouter>
    </>
  )
}

export default App
