import { VFC } from "react";

import { index as Title } from "../../atom/title/index";
import { Article } from "../../molecules/Article/Article";
import { index as LoadingIcon } from "../../atom/loading/index";
import { index as Typography } from "../../atom/typography/index";

import { Head } from "../../Head";

import {
  StyledTopicsPosts,
  StyledTopicsPostsInner,
  StyledPostsArea,
} from "./Styles";

type Props = {
  isLoading: boolean;
  query: URLSearchParams;
  searchPosts: {
    uid: string;
    postId: string;
    title: string;
    body: string;
    timestamp: any;
    likedUsers: string[];
    labels: string[];
  }[];
  extraUser: (postUid: string) =>
    | {
        uid: string;
        username: string;
        avatar: string;
      }
    | undefined;
};

export const Presenter: VFC<Props> = ({
  isLoading,
  query,
  searchPosts,
  extraUser,
}) => {
  if (isLoading) {
    return (
      <>
        <LoadingIcon width="40" height="40" />
      </>
    );
  }

  return (
    <>
      <Head title={`${query.get("search")}の検索結果`} />
      <StyledTopicsPosts>
        <StyledTopicsPostsInner>
          <Title headline="h1">"{query.get("search")}"の検索結果</Title>
          {searchPosts.length > 0 ? (
            <StyledPostsArea>
              {searchPosts.map((post) => (
                <Article
                  key={post.postId}
                  postId={post.postId}
                  uid={post.uid}
                  title={post.title}
                  body={post.body}
                  timestamp={post.timestamp}
                  likedUsers={post.likedUsers}
                  labels={post.labels}
                  username={extraUser(post.uid)!.username}
                  avatar={extraUser(post.uid)!.avatar}
                />
              ))}
            </StyledPostsArea>
          ) : (
            <Typography size="16" margin="20px 0px 0px 0px ">
              "{query.get("search")}"に関する記事は見つかりませんでした。
            </Typography>
          )}
        </StyledTopicsPostsInner>
      </StyledTopicsPosts>
    </>
  );
};
