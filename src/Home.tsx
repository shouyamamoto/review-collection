// import React from 'react'
import { auth } from "./firebase"
import { selectUser } from "./features/users/userSlice"
import { useSelector } from "react-redux"
import { RegisterPopup } from "./RegisterPopup"

export const Home = () => {
  const user = useSelector(selectUser)

  const signOut = () => {
    auth.signOut()
  }

  return (
    <div>
      Home
      <button onClick={signOut}>ログアウト</button>
      { !user.displayName && <RegisterPopup /> }
    </div>
  )
}
