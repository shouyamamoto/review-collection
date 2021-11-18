import { useEffect, useState } from "react";
import firebase from "firebase/app";
import { useHistory, useParams } from "react-router";

import { db } from "../../../libs/firebase";
import { toastHandler } from "../../../utils/toast";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { Presenter } from "./Presenter";

type PostType = {
  id: string;
  uid: string;
  title: string;
  body: string;
  timestamp: any;
  status: string;
  likedUsers: string[];
};

export const ArticlesDashboard = () => {
  const { currentUser } = useCurrentUser();
  const { userId } = useParams<{ userId: string }>();
  const history = useHistory();
  const [currentNum, setCurrentNum] = useState(0);
  const [posts, setPosts] = useState<PostType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getPosts();
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getPosts = async () => {
    const fetchUserPosts = await db
      .collection("posts")
      .where("uid", "==", userId)
      .orderBy("timestamp", "desc");
    fetchUserPosts.onSnapshot((snapshot) => {
      const postData = snapshot.docs.reduce(
        (acc: any, doc: any) => [
          ...acc,
          {
            id: doc.id,
            uid: doc.data().uid,
            title: doc.data().title,
            body: doc.data().body,
            status: doc.data().status,
            timestamp: doc.data({ serverTimestamps: "estimate" }).timestamp,
            likedUsers: doc.data().likedUsers,
          },
        ],
        posts
      );

      setPosts(postData);
    });
  };

  const changeActive = (index: number) => setCurrentNum(index);

  const onClickDelete = (postId: string) => {
    const result = window.confirm("本当に記事を削除しますか？");
    if (result === true) {
      const postRef = db.collection("posts").doc(postId);
      const likedUsers = postRef.get().then((doc) => {
        if (doc.exists) {
          return doc.data()!.likedUsers;
        }
      });
      likedUsers
        .then(async (userIds) => {
          if (userIds.length === 0) return;
          userIds.forEach(async (userId: string) => {
            const fetchUsers = await db
              .collection("users")
              .where("uid", "==", userId);
            const res = await fetchUsers.get();
            res.forEach(async (doc) => {
              await db
                .collection("users")
                .doc(doc.id)
                .update({
                  likedPosts: firebase.firestore.FieldValue.arrayRemove(postId),
                });
            });
          });
        })
        .then(() => {
          db.collection("posts").doc(postId).delete();
        });
      toastHandler("success", "削除しました");
    }
  };

  const onClickEdit = (postId: string) => {
    history.push(`/${userId}/articles/${postId}/edit`);
  };

  return (
    <Presenter
      currentUser={currentUser}
      userId={userId}
      currentNum={currentNum}
      posts={posts}
      changeActive={changeActive}
      onClickDelete={onClickDelete}
      onClickEdit={onClickEdit}
      isLoading={isLoading}
    />
  );
};
