import { VFC } from "react";
import { useParams } from "react-router-dom";

import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { Presenter } from "./Presenter";

export const ProfileEdit: VFC = () => {
  const { currentUser } = useCurrentUser();
  const { userId } = useParams<{ userId: string }>();

  return <Presenter currentUser={currentUser} userId={userId} />;
};
