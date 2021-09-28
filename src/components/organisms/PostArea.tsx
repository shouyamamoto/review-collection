import React, { VFC, useState, useCallback } from "react";

import firebase from "firebase/app";
import { db, storage } from "../../firebase";
import { selectUser } from "../../features/users/userSlice";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import toast from "react-hot-toast";
import styled from "styled-components";

import { uniqueFileName } from "../organisms/ProfileEditArea";
import { PostButtons } from "../molecules/PostButtons";
import { PostInputArea } from "../molecules/PostInputArea";

import { COLOR } from "../../Themes/Color";
import { DEVICE } from "../../Themes/Device";

export const PostArea: VFC = () => {
  const user = useSelector(selectUser);
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [isPreview, setIsPreview] = useState(false);

  const sendPost = useCallback(
    async (title: string, text: string) => {
      await db
        .collection("posts")
        .add({
          uid: user.uid,
          title: title,
          body: text,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
          toast.success("記事を投稿しました", {
            icon: "👏",
            style: {
              borderRadius: "10px",
            },
          });
          history.push(`/${user.uid}`);
        })
        .catch(() => {
          toast.error("記事が投稿できませんでした。", {
            style: {
              borderRadius: "10px",
            },
          });
        });
    },
    [history, user]
  );

  const onChangeInputState = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    setFunction: (e: string) => void
  ) => {
    setFunction(e.target.value);
  };

  const onClickAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files![0]) {
      const fileName = uniqueFileName(e.target.files![0]);
      const uploadImage = storage
        .ref(`images/${fileName}`)
        .put(e.target.files![0]);
      uploadImage.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        () => {},
        () => {
          alert("画像が挿入できませんでした。もう一度試してください。");
        },
        async () => {
          await storage
            .ref("images")
            .child(fileName)
            .getDownloadURL()
            .then((url) => {
              setText((prevText) => {
                return prevText + `![](${url})`;
              });
              e.target.value = "";
            });
        }
      );
    }
  };

  return (
    <StyledPostArea>
      <StyledInner>
        <PostInputArea
          title={title}
          text={text}
          isPreview={isPreview}
          onChangeTitle={(e) => onChangeInputState(e, setTitle)}
          onChangeText={(e) => onChangeInputState(e, setText)}
        />
        <PostButtons
          title={title}
          text={text}
          onClick={() => setIsPreview(!isPreview)}
          sendPost={sendPost}
          onClickAddImage={onClickAddImage}
        />
      </StyledInner>
    </StyledPostArea>
  );
};

const StyledPostArea = styled.div`
  background-color: ${COLOR.BACKGROUND};
  min-height: 100vh;
`;

const StyledInner = styled.div`
  flex: 1;
  width: 90vw;
  margin: 0 auto;
  padding: 40px 0;

  @media ${DEVICE.laptopL} {
    width: 90vw;
    max-width: 1440px;
  }
`;
