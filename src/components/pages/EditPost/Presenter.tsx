import { VFC } from "react";
import { Toaster } from "react-hot-toast";

import { PostArea } from "../../organisms/PostArea";

type Props = {
  editPostData: {
    postId: string;
    title: string;
    text: string;
    labels: string[];
  };
};

export const Presenter: VFC<Props> = ({ editPostData }) => {
  return (
    <main>
      <PostArea editPostData={editPostData} />
      <Toaster position="bottom-right" reverseOrder={false} />
    </main>
  );
};
