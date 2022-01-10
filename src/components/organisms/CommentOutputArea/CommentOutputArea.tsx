import { VFC, memo } from "react";

import { format } from "date-fns";

import { Index as Typography } from "../../atom/typography/index";
import { Index as Title } from "../../atom/title/index";
import { IconWithName } from "../../molecules/IconWithName/IconWithName";
import { db } from "../../../libs/firebase";

import { useCurrentUser } from "../../../hooks/useCurrentUser";

import {
  StyledCommentWrap,
  StyledCommentInner,
  StyledComment,
  StyledTimestamp,
  StyledRiDeleteBin6Line,
  StyledNameWithIcons,
  StyledIcons,
} from "./Styles";

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
  const { currentUser } = useCurrentUser();

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
