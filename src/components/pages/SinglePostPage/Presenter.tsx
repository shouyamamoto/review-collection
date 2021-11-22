import { VFC } from "react";
import gfm from "remark-gfm";
import { Toaster } from "react-hot-toast";
import { format } from "date-fns";

import { index as CodeBlock } from "../../atom/code/index";
import { index as Title } from "../../atom/title/index";
import { index as Loading } from "../../atom/loading/index";
import { Sidebar } from "../../organisms/Sidebar/Sidebar";
import { CommentInputArea } from "../../organisms/CommentInputArea/CommentInputArea";
import { CommentOutputArea } from "../../organisms/CommentOutputArea/CommentOutputArea";
import { Page404 } from "../Page404/Page404";
import { Head } from "../../Head";

import {
  StyledSinglePostPage,
  StyledSinglePostPageInner,
  StyledMarkdownContainer,
  StyledReactMarkdown,
  StyledTitleWrap,
  StyledTitleInner,
  StyledTimestamp,
  StyledCommentArea,
} from "./Styles";

type Props = {
  isLoading: boolean;
  isShow: {
    github: boolean;
    twitter: boolean;
    blogUrl: boolean;
  };
  post: {
    postId: string;
    uid: string;
    title: string;
    body: string;
    timestamp: any;
    likedUsers: string[];
    labels: string[];
  };
  comments: {
    id: string;
    uid: string;
    avatar: string;
    text: string;
    timestamp: any;
    username: string;
  }[];
  element: React.MutableRefObject<any>;
  author: {
    uid: string;
    avatar: string;
    username: string;
    githubName: string;
    twitterName: string;
    blogUrl: string;
    comment: string;
    likedPosts: string[];
  };
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
  postId: string;
  count: number;
  onClickLike: () => void;
  onMouseEnter: (target: string) => void;
  location: any;
};

export const Presenter: VFC<Props> = ({
  isLoading,
  post,
  element,
  author,
  currentUser,
  postId,
  onClickLike,
  count,
  onMouseEnter,
  isShow,
  comments,
  location,
}) => {
  if (isLoading) {
    return <Loading width="60" height="60" />;
  }

  if (post.postId === "") {
    return <Page404 />;
  }
  return (
    <>
      <Head title={post.title} postId={post.postId} />
      <StyledSinglePostPage>
        <StyledTitleWrap>
          <StyledTitleInner>
            <Title headline="h1">{post.title}</Title>
            <StyledTimestamp>
              {format(post.timestamp, "yyyy-MM-dd")} に公開
            </StyledTimestamp>
          </StyledTitleInner>
        </StyledTitleWrap>
        <StyledSinglePostPageInner>
          <StyledMarkdownContainer ref={element}>
            <StyledReactMarkdown
              remarkPlugins={[gfm]}
              children={post.body}
              components={{ code: CodeBlock }}
              className="preview"
            />
          </StyledMarkdownContainer>
          <Sidebar
            author={author}
            currentUserId={currentUser.uid}
            postId={postId}
            location={location.pathname}
            likedPosts={currentUser.likedPosts}
            labels={post.labels}
            onClickLike={onClickLike}
            countLikes={count}
            onMouseEnter={onMouseEnter}
            isShow={isShow}
          />
          <StyledCommentArea>
            <CommentOutputArea postId={postId} comments={comments} />
            {currentUser.uid !== "" && (
              <CommentInputArea
                uid={currentUser.uid}
                postId={postId}
                avatar={currentUser.avatar}
                username={currentUser.username}
              />
            )}
          </StyledCommentArea>
        </StyledSinglePostPageInner>
        <Toaster position="bottom-right" reverseOrder={false} />
      </StyledSinglePostPage>
    </>
  );
};
