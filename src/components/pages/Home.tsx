import { VFC } from "react";
import { memo } from "react";
import { selectUser } from "../../features/users/userSlice";
import { useSelector } from "react-redux";
import { UserNameRegister } from "../organisms/UserNameRegister";
import { Toaster } from "react-hot-toast";

export const Home: VFC = memo(() => {
  const user = useSelector(selectUser);

  return (
    <div>
      Home
      {/* 表示したいのは、ログイン後にuser.displayNameがnullの場合。 */}
      {user.username === null && <UserNameRegister />}
      <Toaster position="bottom-right" reverseOrder={false} />
    </div>
  );
});
