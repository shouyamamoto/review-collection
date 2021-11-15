import { VFC } from "react";
import { Redirect } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import styled from "styled-components";

import { index as Link } from "../atom/link";
import { PrimaryButton } from "../atom/button/PrimaryButton";
import { Tabs } from "../molecules/Tabs";
import { ArticleDashboard as Articles } from "../organisms/ArticleDashboard";
import { DEVICE } from "../../Themes/Device";
import NonePosts from "../../images/no-post.svg";
import { TAB_LIST } from "../../Themes/TabLists";
import { useArticleDashboard } from "../../hooks/ArticlesDashboard/useArticleDashboard";

export const ArticlesDashboard: VFC = () => {
  const {
    currentUser,
    userId,
    currentNum,
    posts,
    changeActive,
    onClickDelete,
    onClickEdit,
  } = useArticleDashboard();

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
