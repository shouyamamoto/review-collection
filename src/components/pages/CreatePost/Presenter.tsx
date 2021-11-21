import { VFC } from "react";
import { Toaster } from "react-hot-toast";

import { PostArea } from "../../organisms/PostArea/PostArea";

import { Head } from "../../Head";

export const Presenter: VFC = () => {
  return (
    <>
      <Head title="記事作成中" />
      <main>
        <PostArea />
        <Toaster position="bottom-right" reverseOrder={false} />
      </main>
    </>
  );
};
