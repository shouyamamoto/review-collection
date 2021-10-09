import { VFC, useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import styled from "styled-components";

import { index as Link } from "../atom/link";
import { PrimaryButton } from "../atom/button/PrimaryButton";
import { Tabs } from "../molecules/Tabs";
import { ArticleDashboard as Articles } from "../organisms/ArticleDashboard";
import { db } from "../../libs/firebase";
import { toastHandler } from "../../utils/toast";
import { DEVICE } from "../../Themes/Device";
import NonePosts from "../../images/no-post.svg";
import { TAB_LIST } from "../../Themes/TabLists";

export const ArticlesDashboard: VFC = () => {
  const { userId } = useParams<{ userId: string }>();
  const history = useHistory();
  const [currentNum, setCurrentNum] = useState(0);
  const [posts, setPosts] = useState([
    {
      id: "",
      uid: "",
      title: "",
      body: "",
      timestamp: "",
      status: "",
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
            }))
          );
        });
    };
    getPosts();
  }, [userId]);

  // statusの重複を無くして、配列に, tabOrderで並び替える
  // const orderedTabList = () => {
  //   const tabOrder = ["release", "draft"];
  //   const tabItem = new Set(posts.map(({ status }) => status));
  //   const tabArray = Array.from(tabItem);
  //   const orderedTabItem = tabArray.sort((x, y) => {
  //     return tabOrder.indexOf(x) - tabOrder.indexOf(y);
  //   });
  //   return orderedTabItem;
  // };

  const changeActive = (index: number) => setCurrentNum(index);

  const onClickDelete = (postId: string) => {
    const result = window.confirm("本当に記事を削除しますか？");
    if (result === true) {
      db.collection("posts").doc(postId).delete();
      toastHandler("success", "削除しました");
    }
  };

  const onClickEdit = (postId: string) => {
    history.push(`/articles/${postId}/edit`);
  };

  return (
    <>
      {posts[0] ? (
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
      )}
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
