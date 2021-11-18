import { VFC } from "react";

import { index as LoadingIcon } from "../../atom/loading/index";
import { PrimaryButton } from "../../atom/button/PrimaryButton";
import { index as Link } from "../../atom/link";
import { Article } from "../../molecules/Article/Article";
import NonePosts from "../../../images/no-post.svg";

import { StyledUserPost, StyledUserPostNone, StyledPostPrompt } from "./Styles";

type Props = {
  isLoading: boolean;
  uid: string;
  username: string;
  avatar: string;
  userPosts: {
    id: string;
    title: string;
    body: string;
    timestamp: any;
    likedUsers: string[];
    labels: string[];
  }[];
};

export const Presenter: VFC<Props> = ({
  isLoading,
  userPosts,
  uid,
  username,
  avatar,
}) => {
  if (isLoading) {
    return <LoadingIcon width="50" height="50" />;
  }
  return (
    <>
      {userPosts[0] ? (
        <StyledUserPost>
          {userPosts.map((post) => (
            <Article
              key={post.id}
              postId={post.id}
              uid={uid}
              username={username}
              avatar={avatar}
              title={post.title}
              body={post.body}
              timestamp={post.timestamp}
              likedUsers={post.likedUsers}
              labels={post.labels}
            />
          ))}
        </StyledUserPost>
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
