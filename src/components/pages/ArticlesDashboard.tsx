import { VFC, useState, useEffect } from "react";
import { useParams, useHistory, Redirect } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import styled from "styled-components";
import firebase from "firebase";

import { index as Link } from "../atom/link";
import { PrimaryButton } from "../atom/button/PrimaryButton";
import { Tabs } from "../molecules/Tabs";
import { ArticleDashboard as Articles } from "../organisms/ArticleDashboard";
import { db } from "../../libs/firebase";
import { toastHandler } from "../../utils/toast";
import { DEVICE } from "../../Themes/Device";
import NonePosts from "../../images/no-post.svg";
import { TAB_LIST } from "../../Themes/TabLists";
import { useCurrentUser } from "../../hooks/useCurrentUser";

type PostType = {
  id: string;
  uid: string;
  title: string;
  body: string;
  timestamp: any;
  status: string;
  likedUsers: string[];
};

export const ArticlesDashboard: VFC = () => {
  const { currentUser } = useCurrentUser();
  const { userId } = useParams<{ userId: string }>();
  const history = useHistory();
  const [currentNum, setCurrentNum] = useState(0);
  const [posts, setPosts] = useState<PostType[]>([
    {
      id: "",
      uid: "",
      title: "",
      body: "",
      timestamp: "",
      status: "",
      likedUsers: [],
    },
  ]);

  useEffect(() => {
    const getPosts = async () => {
      await db
        .collection("posts")
        .where("uid", "==", userId)
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setPosts(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              uid: doc.data().uid,
              title: doc.data().title,
              body: doc.data().body,
              status: doc.data().status,
              timestamp: doc.data().timestamp,
              likedUsers: doc.data().likedUsers,
            }))
          );
        });
    };
    getPosts();
  }, [userId, history]);

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
      likedUsers.then(async (userIds) => {
        if (userIds.length === 0) return;
        userIds.forEach((userId: string) => {
          db.collection("users")
            .where("uid", "==", userId)
            .get()
            .then((snapshot) => {
              snapshot.forEach((doc) => {
                db.collection("users")
                  .doc(doc.id)
                  .update({
                    likedPosts:
                      firebase.firestore.FieldValue.arrayRemove(postId),
                  });
              });
            })
            .then(() => {
              db.collection("posts").doc(postId).delete();
            });
        });
      });
      toastHandler("success", "削除しました");
    }
  };

  const onClickEdit = (postId: string) => {
    history.push(`/${userId}/articles/${postId}/edit`);
  };

  if (currentUser.uid !== userId) {
    return <Redirect to="/" />;
  }

  return (
    <>
      {currentUser!.uid === userId &&
        (posts[0] ? (
          <StyledArticleDashboard>
            <Tabs
              tabList={TAB_LIST}
              changeActive={changeActive}
              currentNum={currentNum}
            />
            <Articles
              currentNum={currentNum}
              posts={posts}
              onClickDelete={onClickDelete}
              onClickEdit={onClickEdit}
            />
            <Toaster position="bottom-right" reverseOrder={false} />
          </StyledArticleDashboard>
        ) : (
          <StyledUserPostNone>
            <img src={NonePosts} alt="" width="400" />
            <StyledPostPrompt>
              まだ投稿がありません。
              <br />
              レビューしたこと、されたことを書いてみませんか？
              <Link to={`/articles/new`}>
                <PrimaryButton>Add Post</PrimaryButton>
              </Link>
            </StyledPostPrompt>
          </StyledUserPostNone>
        ))}
    </>
  );
};

const StyledArticleDashboard = styled.main`
  width: 90%;
  max-width: 600px;
  margin: 0 auto;
  padding: 40px 0;

  @media ${DEVICE.laptop} {
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    justify-content: flex-start;
    gap: 0 80px;
    width: 80%;
    max-width: 1024px;
    padding: 60px 0;
  }
`;

const StyledUserPostNone = styled.div`
  width: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 16px 10px;

  @media ${DEVICE.mobileM} {
    grid-template-columns: 1fr 1fr;
  }

  @media ${DEVICE.laptop} {
    width: 100%;
    max-width: 1024px;
    grid-template-columns: 1fr 1fr;
    grid-gap: 32px 20px;
    align-items: center;
    height: 100%;
  }
`;

const StyledPostPrompt = styled.div`
  justify-items: center;
  align-items: center;
  display: grid;

  @media ${DEVICE.laptop} {
    grid-gap: 40px;
  }
`;
