import { VFC, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { PostArea } from "../organisms/PostArea";
import { db } from "../../libs/firebase";

export const EditPost: VFC = () => {
  const { postId } = useParams<{ postId: string }>();
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

  return (
    <main>
      <PostArea editPostData={editPostData} />
      <Toaster position="bottom-right" reverseOrder={false} />
    </main>
  );
};
