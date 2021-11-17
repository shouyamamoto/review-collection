import { VFC } from "react";
import { format } from "date-fns";

import { index as Link } from "../../atom/link/index";

import {
  StyledArticleDashboard,
  StyledReleaseArticles,
  StyledDraftArticles,
  StyledArticle,
  StyledTitle,
  StyledTitleInner,
  StyledTimestamp,
  StyledIcons,
  StyledBsPencil,
  StyledRiDeleteBin6Line,
} from "./Styles";

type Props = {
  currentNum: number;
  posts: {
    id: string;
    uid: string;
    title: string;
    body: string;
    timestamp: any;
    status: string;
  }[];
  onClickDelete: (postId: string) => void;
  onClickEdit: (postId: string) => void;
};

export const ArticleDashboard: VFC<Props> = ({
  currentNum,
  posts,
  onClickDelete,
  onClickEdit,
}) => {
  return (
    <StyledArticleDashboard>
      <StyledReleaseArticles isActive={currentNum}>
        {posts.map(
          (post) =>
            post.status === "release" && (
              <StyledArticle key={post.id}>
                <StyledTitle>
                  <Link to={`/${post.uid}/articles/${post.id}`}>
                    <StyledTitleInner>{post.title}</StyledTitleInner>
                  </Link>
                  <StyledIcons>
                    <StyledBsPencil onClick={() => onClickEdit(post.id)} />
                    <StyledRiDeleteBin6Line
                      onClick={() => onClickDelete(post.id)}
                    />
                  </StyledIcons>
                </StyledTitle>
                <StyledTimestamp>
                  {format(post.timestamp.toDate(), "yyyy-MM-dd")} に公開
                </StyledTimestamp>
              </StyledArticle>
            )
        )}
      </StyledReleaseArticles>
      <StyledDraftArticles isActive={currentNum}>
        {posts.map(
          (post) =>
            post.status === "draft" && (
              <StyledArticle key={post.id}>
                <StyledTitle>
                  <StyledTitleInner>{post.title}</StyledTitleInner>
                  <StyledIcons>
                    <StyledBsPencil onClick={() => onClickEdit(post.id)} />
                    <StyledRiDeleteBin6Line
                      onClick={() => onClickDelete(post.id)}
                    />
                  </StyledIcons>
                </StyledTitle>
                <StyledTimestamp>
                  {format(post.timestamp.toDate(), "yyyy-MM-dd")} に下書き保存
                </StyledTimestamp>
              </StyledArticle>
            )
        )}
      </StyledDraftArticles>
    </StyledArticleDashboard>
  );
};
