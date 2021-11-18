import { VFC } from "react";
import { Toaster } from "react-hot-toast";
import { PostArea } from "../../organisms/PostArea/PostArea";

export const Presenter: VFC = () => {
  return (
    <main>
      <PostArea />
      <Toaster position="bottom-right" reverseOrder={false} />
    </main>
  );
};
