import { selectUser } from "./features/users/userSlice"
import { useSelector } from "react-redux"
import { auth } from "./firebase"
import { Link } from "react-router-dom"
import logo from "./images/logo.png"

export const Header = () => {
  const user = useSelector(selectUser)

  const signOut = () => {
    auth.signOut()
  }

  return (
    <>
      <header>
        <img src={logo} alt="Review-collection" width="100" height="100" />
        { user.uid 
        ? <>
            <img src={user.photoUrl} alt="" width="80" height="80" /> 
            <button onClick={signOut}>ログアウト</button>
          </>
        : <Link to="login">login</Link>
        }
      </header>
    </>
  )
}
