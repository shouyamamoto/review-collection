import { VFC, useState, useEffect } from "react";
import { useParams, Redirect } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { PostArea } from "../organisms/PostArea";
import { db } from "../../libs/firebase";
import { useCurrentUser } from "../../hooks/useCurrentUser";

type EditPostType = {
  postId: string;
  title: string;
  text: string;
  labels: string[];
};

export const EditPost: VFC = () => {
  const { currentUser } = useCurrentUser();
  const { userId, postId } = useParams<{ userId: string; postId: string }>();
  const [editPostData, setEditPostData] = useState<EditPostType>({
    postId: postId,
    title: "",
    text: "",
    labels: [],
  });

  useEffect(() => {
    const getEditPostData = async () => {
      const fetchPost = await db.collection("posts").doc(postId);
      const res = fetchPost.get();
      res.then((doc) => {
        if (doc.exists) {
          setEditPostData({
            postId: postId,
            title: doc!.data()!.title,
            text: doc!.data()!.body,
            labels: doc!.data()!.labels,
          });
        }
      });
    };
    getEditPostData();
  }, [postId]);

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
