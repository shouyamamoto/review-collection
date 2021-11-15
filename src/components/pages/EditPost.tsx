import { VFC } from "react";
import { Redirect } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { PostArea } from "../organisms/PostArea";
import { useEditPost } from "../../hooks/EditPost/useEditPost";

export const EditPost: VFC = () => {
  const { currentUser, userId, editPostData } = useEditPost();

  if (currentUser.uid !== userId) {
    return <Redirect to="/" />;
  }

  return (
    <main>
      <PostArea editPostData={editPostData} />
      <Toaster position="bottom-right" reverseOrder={false} />
    </main>
  );
};
