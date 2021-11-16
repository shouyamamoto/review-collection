import { VFC } from "react";
import { Redirect } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { index as Link } from "../../atom/link";
import { PrimaryButton } from "../../atom/button/PrimaryButton";
import { Tabs } from "../../molecules/Tabs";
import { ArticleDashboard as Articles } from "../../organisms/ArticleDashboard";
import NonePosts from "../../../images/no-post.svg";
import { TAB_LIST } from "../../../Themes/TabLists";
import {
  StyledArticleDashboard,
  StyledUserPostNone,
  StyledPostPrompt,
} from "./Styles";

type Props = {
  currentUser: {
    uid: string;
    username: string;
    comment: string;
    avatar: string;
    twitterName: string;
    githubName: string;
    blogUrl: string;
    likedPosts: string[];
  };
  userId: string;
  currentNum: number;
  posts: {
    id: string;
    uid: string;
    title: string;
    body: string;
    timestamp: any;
    status: string;
    likedUsers: string[];
  }[];
  changeActive: (index: number) => void;
  onClickDelete: (postId: string) => void;
  onClickEdit: (postId: string) => void;
};

export const Presenter: VFC<Props> = ({
  currentUser,
  userId,
  currentNum,
  posts,
  changeActive,
  onClickDelete,
  onClickEdit,
}) => {
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
