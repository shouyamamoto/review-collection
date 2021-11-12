import { VFC, memo } from "react";
import styled from "styled-components";
import { format } from "date-fns";

import { index as Typography } from "../atom/typography/index";
import { index as Title } from "../atom/title/index";
import { IconWithName } from "../molecules/IconWithName";
import { DEVICE } from "../../Themes/Device";
import { COLOR } from "../../Themes/Color";

type Props = {
  comments: {
    id: string;
    avatar: string;
    text: string;
    timestamp: any;
    username: string;
  }[];
};

export const CommentOutputArea: VFC<Props> = memo(({ comments }) => {
  return (
    <StyledCommentWrap>
      <StyledCommentInner>
        <Title headline="h3">Comment</Title>
        {comments.map((comment) => (
          <StyledComment key={comment.id}>
            <IconWithName
              src={comment.avatar}
              alt={comment.username}
              width="30"
              height="30"
              username={comment.username}
            />
            <StyledTimestamp>
              {format(comment.timestamp, "yyyy-MM-dd")}
            </StyledTimestamp>
            <Typography size="15">{comment.text}</Typography>
          </StyledComment>
        ))}
      </StyledCommentInner>
    </StyledCommentWrap>
  );
});

const StyledCommentWrap = styled.div`
  padding: 0 14px;

  @media ${DEVICE.tabletL} {
    padding: 0;
  }
`;

const StyledCommentInner = styled.div`
  background-color: ${COLOR.WHITE};
  padding: 40px 20px;
  box-sizing: border-box;
  border-radius: 10px;
  display: grid;
  gap: 40px;

  @media ${DEVICE.tabletL} {
    padding: 40px;
  }
`;

const StyledComment = styled.div`
  display: grid;
  gap: 10px;
  padding-bottom: 32px;

  &:not(:last-child) {
    border-bottom: 1px solid ${COLOR.BACKGROUND};
  }
`;

const StyledTimestamp = styled.span`
  font-size: 12px;
  color: ${COLOR.GRAY};
`;
