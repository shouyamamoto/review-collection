import { VFC, useState, memo } from "react";
import styled from "styled-components";
import { db } from "../../libs/firebase";
import firebase from "firebase";

import { DEVICE } from "../../Themes/Device";
import { index as TextArea } from "../atom/textArea/index";
import { PrimaryButton } from "../atom/button/PrimaryButton";

type Props = {
  uid: string;
  postId: string;
  avatar: string;
  username: string;
};

export const CommentInputArea: VFC<Props> = memo(
  ({ postId, uid, avatar, username }) => {
    const [comment, setComment] = useState("");

    const newComment = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      db.collection("posts").doc(postId).collection("comment").add({
        uid: uid,
        avatar: avatar,
        text: comment,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        username: username,
      });
      setComment("");
    };

    return (
      <form onSubmit={newComment}>
        <StyledCommentInputArea>
          <StyledTextArea
            value={comment}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              setComment(e.target.value);
            }}
            placeholder="記事についてコメントしてみましょう"
          />
          <StyledButtonWrap>
            <PrimaryButton type="submit">投稿</PrimaryButton>
          </StyledButtonWrap>
        </StyledCommentInputArea>
      </form>
    );
  }
);

const StyledCommentInputArea = styled.div`
  text-align: right;
`;

const StyledTextArea = styled(TextArea)`
  min-height: 240px;
  width: calc(100% - 28px);
  margin: 0 auto 10px;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  line-height: 1.8;
  padding: 20px 14px;

  @media ${DEVICE.tabletL} {
    width: 100%;
    padding: 28px;
  }
`;

const StyledButtonWrap = styled.div`
  padding: 0 14px;

  @media ${DEVICE.tabletL} {
    padding: 0;
  }
`;
