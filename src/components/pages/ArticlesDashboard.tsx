import { VFC, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { db } from "../../firebase";
import { DEVICE } from "../../Themes/Device";
import { Tabs } from "../molecules/Tabs";
import { ArticleDashboard as Articles } from "../organisms/ArticleDashboard";

export const ArticlesDashboard: VFC = () => {
  const { userId } = useParams<{ userId: string }>();
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
  const tabList = () => {
    const tabOrder = ["release", "draft"];
    const tabItem = new Set(posts.map(({ status }) => status));
    const tabArray = Array.from(tabItem);
    const orderedTabItem = tabArray.sort((x, y) => {
      return tabOrder.indexOf(x) - tabOrder.indexOf(y);
    });
    return orderedTabItem;
  };

  const changeActive = (index: number) => setCurrentNum(index);

  const onClickDelete = (postId: string) => {
    const result = window.confirm("本当に記事を削除しますか？");
    if (result === true) {
      db.collection("posts").doc(postId).delete();
    }
  };

  return (
    <StyledArticleDashboard>
      <Tabs
        tabList={tabList()}
        changeActive={changeActive}
        currentNum={currentNum}
      />
      <Articles
        currentNum={currentNum}
        posts={posts}
        onClickDelete={onClickDelete}
      />
    </StyledArticleDashboard>
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
