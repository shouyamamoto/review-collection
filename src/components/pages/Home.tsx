import { memo } from "react"
import { selectUser } from "../../features/users/userSlice"
import { useSelector } from "react-redux"
import { UserNameRegister } from "../organisms/UserNameRegister"

export const Home = memo(() => {
  const user = useSelector(selectUser)

  return (
    <div>
      Home
      {/* 表示したいのは、ログイン後にuser.displayNameがnullの場合。 */}
      {user.displayName === null && <UserNameRegister />}
    </div>
  )
})
