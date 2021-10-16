import React, { VFC, useState, useLayoutEffect, useCallback } from "react";
import firebase from "firebase/app";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import { selectUser } from "../../features/users/userSlice";
import { db, storage } from "../../libs/firebase";
import { index as Loading } from "../atom/loading/index";
import { PostButtons } from "../molecules/PostButtons";
import { PostInputArea } from "../molecules/PostInputArea";

import { toastHandler } from "../../utils/toast";
import { uniqueFileName } from "../../utils/uniqueFileName";
import { resizeFile } from "../../utils/resizeFile";
import { COLOR } from "../../Themes/Color";
import { DEVICE } from "../../Themes/Device";

type Props = {
  editPostData?: {
    postId: string;
    title: string;
    text: string;
  };
};

export const PostArea: VFC<Props> = ({ editPostData }) => {
  const user = useSelector(selectUser);
  const history = useHistory();
  const [isUploading, setIsUpLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [isPreview, setIsPreview] = useState(false);

  useLayoutEffect(() => {
    if (editPostData) {
      setTitle(editPostData.title);
      setText(editPostData.text);
    }
  }, [editPostData]);

  const sendPost = useCallback(
    async (title: string, text: string) => {
      if (editPostData?.postId) {
        db.collection("posts")
          .doc(editPostData.postId)
          .update({
            uid: user.uid,
            title: title,
            body: text,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            status: "release",
          })
          .then(() => {
            toastHandler("success", "記事を更新しました");
            history.push(`/${user.uid}/articles/${editPostData.postId}`);
          });
      } else {
        await db
          .collection("posts")
          .add({
            uid: user.uid,
            title: title,
            body: text,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            status: "release",
          })
          .then(() => {
            toastHandler("success", "記事を投稿しました");
            history.push(`/${user.uid}`);
          })
          .catch(() => {
            toastHandler("error", "記事を投稿できませんでした");
          });
      }
    },
    [history, user, editPostData?.postId]
  );

  const onClickSave = () => {
    if (editPostData?.postId) {
      db.collection("posts")
        .doc(editPostData.postId)
        .update({
          uid: user.uid,
          title: title,
          body: text,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          status: "draft",
        })
        .then(() => {
          toastHandler("success", "下書きに追加しました");
          history.push(`/${user.uid}/dashboard`);
        });
    } else {
      db.collection("posts")
        .add({
          uid: user.uid,
          title: title,
          body: text,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          status: "draft",
        })
        .then(() => {
          toastHandler("success", "下書きに追加しました");
          history.push(`/${user.uid}/dashboard`);
        })
        .catch(() => {
          toastHandler("error", "記事を投稿できませんでした");
        });
    }
  };

  const onClickAddImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files![0]) {
      const { files } = e.target;
      setIsUpLoading(true);
      const fileName = uniqueFileName(files![0]);
      const resizeImage = (await resizeFile(files![0], 1000, 600)) as string;
      const uploadImage = storage
        .ref(`images/${fileName}`)
        .putString(resizeImage, "data_url");
      uploadImage.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {
          const progress: number =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (progress === 100) {
            setIsUpLoading(false);
          }
        },
        () => {
          alert("画像が挿入できませんでした。もう一度試してください。");
        },
        async () => {
          await storage
            .ref("images")
            .child(fileName)
            .getDownloadURL()
            .then((url) => {
              setText((prevText: string) => {
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
          onChangeTitle={(e) => {
            setTitle(e.target.value);
          }}
          onChangeText={(e) => {
            setText(e.target.value);
          }}
        />
        <PostButtons
          title={title}
          text={text}
          onClickPreview={() => setIsPreview(!isPreview)}
          sendPost={sendPost}
          onClickAddImage={onClickAddImage}
          onClickSave={onClickSave}
        />
      </StyledInner>
      <StyledUploadIcon>
        {isUploading && <Loading width="40" height="40" />}
      </StyledUploadIcon>
    </StyledPostArea>
  );
};

const StyledPostArea = styled.div`
  position: relative;
  background-color: ${COLOR.BACKGROUND};
  min-height: 100vh;
`;

const StyledUploadIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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

  @media ${DEVICE.desktop} {
    max-width: 2000px;
  }
`;
