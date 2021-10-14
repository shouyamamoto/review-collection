import { VFC, useState, useEffect } from "react";
import { useParams, Redirect } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { PostArea } from "../organisms/PostArea";
import { db } from "../../libs/firebase";
import { useCurrentUser } from "../../hooks/useCurrentUser";

export const EditPost: VFC = () => {
  const { currentUser } = useCurrentUser();
  const { userId, postId } = useParams<{ userId: string; postId: string }>();
  const [editPostData, setEditPostData] = useState({
    postId: postId,
    title: "",
    text: "",
  });

  useEffect(() => {
    const getEditPostData = async () => {
      const docRef = await db.collection("posts").doc(postId);
      await docRef.get().then((doc) => {
        if (doc.exists) {
          setEditPostData({
            postId: postId,
            title: doc!.data()!.title,
            text: doc!.data()!.body,
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
