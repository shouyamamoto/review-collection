import { VFC, memo } from "react";
import styled from "styled-components";
import { format } from "date-fns";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useSelector } from "react-redux";

import { index as Typography } from "../atom/typography/index";
import { index as Title } from "../atom/title/index";
import { IconWithName } from "../molecules/IconWithName";
import { db } from "../../libs/firebase";
import { DEVICE } from "../../Themes/Device";
import { COLOR } from "../../Themes/Color";
import { selectUser } from "../../features/users/userSlice";

type Props = {
  postId: string;
  comments: {
    id: string;
    uid: string;
    avatar: string;
    text: string;
    timestamp: any;
    username: string;
  }[];
};

export const CommentOutputArea: VFC<Props> = memo(({ postId, comments }) => {
  const currentUser = useSelector(selectUser);

  const onClickDelete = (commentId: string) => {
    const result = window.confirm("本当に削除しますか?");
    if (result === true) {
      db.collection("posts")
        .doc(postId)
        .collection("comment")
        .doc(commentId)
        .delete();
    }
  };
  return (
    <StyledCommentWrap>
      <StyledCommentInner>
        <Title headline="h3">Comment</Title>
        {comments.map((comment) => (
          <StyledComment key={comment.id}>
            <StyledNameWithIcons>
              <IconWithName
                src={comment.avatar}
                alt={comment.username}
                width="30"
                height="30"
                username={comment.username}
              />
              {comment.uid === currentUser.uid && (
                <StyledIcons>
                  <StyledRiDeleteBin6Line
                    onClick={() => onClickDelete(comment.id)}
                  />
                </StyledIcons>
              )}
            </StyledNameWithIcons>
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

const StyledRiDeleteBin6Line = styled(RiDeleteBin6Line)`
  padding: 10px;
  background-color: ${COLOR.BACKGROUND};
  border-radius: 50%;
  font-size: 12px;
  transition: all 0.3s;

  &:hover {
    cursor: pointer;
    background-color: ${COLOR.GRAY};
    color: ${COLOR.WHITE};
  }

  @media ${DEVICE.tabletL} {
    font-size: 16px;
  }
`;

const StyledNameWithIcons = styled.div`
  display: flex;
  justify-content: space-between;
  }
`;

const StyledIcons = styled.div`
  display: flex;
  gap: 10px;
`;
