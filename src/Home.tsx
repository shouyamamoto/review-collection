import { selectUser } from "./features/users/userSlice"
import { useSelector } from "react-redux"
import { RegisterPopup } from "./RegisterPopup"

export const Home = () => {
  const user = useSelector(selectUser)

  return (
    <div>
      Home
      {/* 表示したいのは、ログイン後にuser.displayNameがnullの場合。 */}
      {user.displayName === null && <RegisterPopup />}
    </div>
  )
}
