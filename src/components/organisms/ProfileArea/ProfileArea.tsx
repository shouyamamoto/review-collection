import { VFC } from "react";
import { Presenter } from "./Presenter";

type Props = {
  username: string;
  comment: string;
  githubName: string;
  twitterName: string;
  blogUrl: string;
  onMouseEnter: (target: string) => void;
  isShow: {
    github: boolean;
    twitter: boolean;
    blogUrl: boolean;
  };
};

export const ProfileArea: VFC<Props> = ({
  username,
  comment,
  githubName,
  twitterName,
  blogUrl,
  onMouseEnter,
  isShow,
}) => {
  return (
    <Presenter
      username={username}
      comment={comment}
      githubName={githubName}
      twitterName={twitterName}
      blogUrl={blogUrl}
      onMouseEnter={onMouseEnter}
      isShow={isShow}
    />
  );
};
