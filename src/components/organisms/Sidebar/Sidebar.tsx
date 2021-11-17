import { VFC } from "react";

import { Presenter } from "./Presenter";

type Props = {
  author: {
    uid: string;
    avatar: string;
    username: string;
    githubName: string;
    twitterName: string;
    blogUrl: string;
    comment: string;
  };
  currentUserId: string;
  postId: string;
  location: string;
  likedPosts: string[];
  labels: string[];
  onClickLike: () => void;
  countLikes: number;
  onMouseEnter: (target: string) => void;
  isShow: {
    github: boolean;
    twitter: boolean;
    blogUrl: boolean;
  };
};

export const Sidebar: VFC<Props> = ({
  author,
  currentUserId,
  postId,
  location,
  likedPosts,
  labels,
  onClickLike,
  countLikes,
  onMouseEnter,
  isShow,
}) => {
  return (
    <Presenter
      author={author}
      currentUserId={currentUserId}
      postId={postId}
      location={location}
      likedPosts={likedPosts}
      labels={labels}
      onClickLike={onClickLike}
      countLikes={countLikes}
      onMouseEnter={onMouseEnter}
      isShow={isShow}
    />
  );
};
