import { VFC } from "react";
import styled from "styled-components";
import { BsPencil } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";

import { COLOR } from "../../Themes/Color";
import { DEVICE } from "../../Themes/Device";

type Props = {
  currentNum: number;
  posts: {
    id: string;
    uid: string;
    title: string;
    body: string;
    timestamp: string;
    status: string;
  }[];
};

type IsActive = {
  isActive: number;
};

export const ArticleDashboard: VFC<Props> = ({ currentNum, posts }) => {
  return (
    <StyledArticleDashboard>
      <StyledReleaseArticles isActive={currentNum}>
        {posts.map(
          (post) =>
            post.status === "release" && (
              <StyledArticle key={post.id}>
                <StyledTitle>
                  <StyledTitleInner>{post.title}</StyledTitleInner>
                  <StyledIcons>
                    <BsPencil />
                    <RiDeleteBin6Line />
                  </StyledIcons>
                </StyledTitle>
                <StyledTimestamp>2021.10.15に公開</StyledTimestamp>
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
                    <BsPencil />
                    <RiDeleteBin6Line />
                  </StyledIcons>
                </StyledTitle>
                <StyledTimestamp>2021.10.15に公開</StyledTimestamp>
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
  font-weight: bold;
`;

const StyledTitleInner = styled.h2`
  font-size: 14px;
  width: 70%;

  @media ${DEVICE.laptop} {
    font-size: 16px;
    width: 70%;
  }
`;

const StyledTimestamp = styled.span`
  font-size: 12px;
  color: ${COLOR.GRAY};
`;

const StyledIcons = styled.div`
  display: flex;
  gap: 0 20px;
  padding-left: auto;
`;
