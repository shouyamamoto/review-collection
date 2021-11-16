import { useEffect, useState } from "react";
import { VFC } from "react";
import { useParams } from "react-router";
import { Redirect } from "react-router-dom";

import { db } from "../../../libs/firebase";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { Presenter } from "./Presenter";

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

  return <Presenter editPostData={editPostData} />;
};
