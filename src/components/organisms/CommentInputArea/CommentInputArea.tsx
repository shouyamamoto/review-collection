import { VFC, useState, memo } from "react";

import { db } from "../../../libs/firebase";
import firebase from "firebase";
import { PrimaryButton } from "../../atom/button/PrimaryButton";

import {
  StyledCommentInputArea,
  StyledTextArea,
  StyledButtonWrap,
} from "./Styles";

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
