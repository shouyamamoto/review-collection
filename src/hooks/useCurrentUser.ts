import { useSelector } from "react-redux";
import { selectUser } from "../features/users/userSlice";

export const useCurrentUser = () => {
  const currentUser = useSelector(selectUser);
  return { currentUser };
};
