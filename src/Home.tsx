import { useEffect } from "react"
import { selectUser } from "./features/users/userSlice"
import { useSelector } from "react-redux"
import { RegisterPopup } from "./RegisterPopup"

export const Home = () => {
  const user = useSelector(selectUser)

  return (
    <div>
      Home
      { !user.displayName && <RegisterPopup /> }
    </div>
  )
}
