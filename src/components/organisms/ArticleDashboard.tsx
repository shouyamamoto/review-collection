import { VFC } from "react";
import styled from "styled-components";
import { BsPencil } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import { format } from "date-fns";

import { index as Link } from "../atom/link/index";
import { COLOR } from "../../Themes/Color";
import { DEVICE } from "../../Themes/Device";

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

type IsActive = {
  isActive: number;
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

const StyledArticleDashboard = styled.div`
  width: 100%;
`;

const StyledReleaseArticles = styled.ul<IsActive>`
  height: ${(props) => (props.isActive === 0 ? "100%" : "0")};
  z-index: ${(props) => (props.isActive === 0 ? "1" : "0")};
  opacity: ${(props) => (props.isActive === 0 ? "1" : "0")};
  pointer-events: ${(props) => (props.isActive === 0 ? "all" : "none")};
  width: 100%;
`;
const StyledDraftArticles = styled.ul<IsActive>`
  height: ${(props) => (props.isActive === 1 ? "100%" : "0")};
  z-index: ${(props) => (props.isActive === 1 ? "1" : "0")};
  opacity: ${(props) => (props.isActive === 1 ? "1" : "0")};
  pointer-events: ${(props) => (props.isActive === 1 ? "all" : "none")};
  width: 100%;
`;

const StyledArticle = styled.li`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px 0;
  padding: 14px 0;

  &:not(:last-child) {
    border-bottom: 1px solid ${COLOR.BACKGROUND};
  }
`;

const StyledTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
`;

const StyledTitleInner = styled.h2`
  font-size: 14px;
  width: 100%;

  @media ${DEVICE.laptop} {
    font-size: 16px;
    max-width: 480px;
  }
  @media ${DEVICE.laptopL} {
    max-width: 600px;
  }
`;

const StyledTimestamp = styled.span`
  font-size: 12px;
  color: ${COLOR.GRAY};
`;

const StyledIcons = styled.div`
  display: flex;
  gap: 0 10px;
  padding-left: auto;
`;

const StyledBsPencil = styled(BsPencil)`
  padding: 10px;
  background-color: ${COLOR.BACKGROUND};
  border-radius: 50%;
  transition: all 0.3s;

  &:hover {
    cursor: pointer;
    background-color: ${COLOR.GRAY};
    color: ${COLOR.WHITE};
  }
`;
const StyledRiDeleteBin6Line = styled(RiDeleteBin6Line)`
  padding: 10px;
  background-color: ${COLOR.BACKGROUND};
  border-radius: 50%;
  transition: all 0.3s;

  &:hover {
    cursor: pointer;
    background-color: ${COLOR.GRAY};
    color: ${COLOR.WHITE};
  }v
`;
