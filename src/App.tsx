import { useEffect } from 'react'
import { auth } from "./firebase"
import { login, logout } from "./features/users/userSlice"
import { useDispatch } from "react-redux"
import { Home } from "./components/pages/Home"
import { Profile } from "./components/pages/Profile"
import { Header } from "./components/organisms/Header"
import { BrowserRouter, Route } from "react-router-dom"
// import reset from "styled-reset"
import { createGlobalStyle } from "styled-components"
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';

const GlobalStyle = createGlobalStyle`
* {
  line-height: 1.6;
  letter-spacing: 0.07em;
  padding: 0;
  margin: 0;
} 
ul,li {
  list-style: none;
  padding: 0;
  margin: 0;
}
a {
  text-decoration: none;
  color: black;
}
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
      <ToastContainer autoClose={2000}/>
    </>
  )
}

export default App
