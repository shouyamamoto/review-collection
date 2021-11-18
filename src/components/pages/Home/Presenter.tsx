import { VFC } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { Toaster } from "react-hot-toast";

import { index as Title } from "../../atom/title/index";
import { index as LoadingIcon } from "../../atom/loading/index";
import { UserNameRegister } from "../../organisms/UserNameRegister/UserNameRegister";
import { Article } from "../../molecules/Article/Article";

import {
  StyledHomePosts,
  StyledHomePostsInner,
  StyledHomePostsArea,
  StyledHomeLoadingInner,
} from "./Styles";

type Props = {
  isLoading: boolean;
  getPosts: () => Promise<void>;
  oldestId: string | null;
  posts: {
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
};

export const Presenter: VFC<Props> = ({
  isLoading,
  getPosts,
  oldestId,
  posts,
  extraUser,
  currentUser,
}) => {
  if (isLoading) {
    return (
      <StyledHomeLoadingInner>
        <LoadingIcon width="40" height="40" />
      </StyledHomeLoadingInner>
    );
  }

  return (
    <main>
      <StyledHomePosts>
        <StyledHomePostsInner>
          <Title headline="h1">Articles</Title>
          <InfiniteScroll
            pageStart={0}
            loadMore={getPosts}
            hasMore={oldestId !== posts[posts.length - 1].postId}
            loader={<LoadingIcon width="40" height="40" />}
          >
            <StyledHomePostsArea>
              {posts.map((post) => (
                <Article
                  key={post.postId}
                  postId={post.postId}
                  uid={post.uid}
                  username={extraUser(post.uid)!.username}
                  avatar={extraUser(post.uid)!.avatar}
                  title={post.title}
                  body={post.body}
                  timestamp={post.timestamp}
                  likedUsers={post.likedUsers}
                  labels={post.labels}
                />
              ))}
            </StyledHomePostsArea>
          </InfiniteScroll>
        </StyledHomePostsInner>
      </StyledHomePosts>

      {
        /* githubで初回サインインするとdisplayNameがないので、ここで登録させる */
        currentUser.username === null && <UserNameRegister />
      }
      <Toaster position="bottom-right" reverseOrder={false} />
    </main>
  );
};
