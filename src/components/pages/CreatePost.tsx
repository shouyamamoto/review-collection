import { VFC } from "react";
import { PostArea } from "../organisms/PostArea";
import { Toaster } from "react-hot-toast";

export const CreatePost: VFC = () => {
  return (
    <>
      <PostArea />
      <Toaster position="bottom-right" reverseOrder={false} />
    </>
  );
};
