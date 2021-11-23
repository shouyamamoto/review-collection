import React, { VFC, useState, useLayoutEffect, useCallback } from "react";
import firebase from "firebase/app";
import { useHistory } from "react-router-dom";

import { db, storage } from "../../../libs/firebase";

import { toastHandler } from "../../../utils/toast";
import { uniqueFileName } from "../../../utils/uniqueFileName";
import { resizeFile } from "../../../utils/resizeFile";
import { useCurrentUser } from "../../../hooks/useCurrentUser";

import { Presenter } from "./Presenter";

type Props = {
  editPostData?: {
    postId: string;
    title: string;
    text: string;
    likedUsers?: string[];
    labels: string[];
  };
};

export const PostArea: VFC<Props> = ({ editPostData }) => {
  const { currentUser } = useCurrentUser();
  const history = useHistory();
  const [isUploading, setIsUpLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [isPreview, setIsPreview] = useState(false);
  const [addLabel, setAddLabel] = useState("");
  const [labels, setLabels] = useState<string[]>([]);
  const [isShow, setIsShow] = useState({
    preview: false,
    image: false,
    draft: false,
    writing: false,
    send: false,
  });

  useLayoutEffect(() => {
    if (editPostData) {
      setTitle(editPostData.title);
      setText(editPostData.text);
      setLabels(editPostData.labels);
    }
  }, [editPostData]);

  const sendPost = useCallback(
    async (title: string, text: string) => {
      if (editPostData?.postId) {
        db.collection("posts")
          .doc(editPostData.postId)
          .update({
            title: title,
            body: text,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            status: "release",
            labels: labels,
          })
          .then(() => {
            toastHandler("success", "記事を更新しました");
            history.push(`/${currentUser.uid}/articles/${editPostData.postId}`);
          });
      } else {
        await db
          .collection("posts")
          .add({
            uid: currentUser.uid,
            title: title,
            body: text,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            status: "release",
            likedUsers: [],
            labels: labels,
          })
          .then(() => {
            toastHandler("success", "記事を投稿しました");
            history.push(`/${currentUser.uid}`);
          })
          .catch(() => {
            toastHandler("error", "記事を投稿できませんでした");
          });
      }
    },
    [history, currentUser, editPostData?.postId, labels]
  );

  const onClickSave = () => {
    if (editPostData?.postId) {
      db.collection("posts")
        .doc(editPostData.postId)
        .update({
          title: title,
          body: text,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          status: "draft",
          labels: labels,
        })
        .then(() => {
          toastHandler("success", "下書きに追加しました");
          history.push(`/${currentUser.uid}/dashboard`);
        });
    } else {
      db.collection("posts")
        .add({
          uid: currentUser.uid,
          title: title,
          body: text,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          status: "draft",
          likedUsers: [],
          labels: labels,
        })
        .then(() => {
          toastHandler("success", "下書きに追加しました");
          history.push(`/${currentUser.uid}/dashboard`);
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

  const addToLabel = () => {
    setAddLabel("");
    setLabels((prevLabels) => {
      return [...prevLabels, addLabel];
    });
  };

  const removeLabel = (targetLabel: string) => {
    setLabels((prevLabels) => {
      return prevLabels.filter((label) => label !== targetLabel);
    });
  };

  const onMouseEnter = (target: string) => {
    setIsShow({
      ...isShow,
      preview: target === "preview" && !isShow.preview,
      image: target === "image" && !isShow.image,
      draft: target === "draft" && !isShow.draft,
      writing: target === "writing" && !isShow.writing,
      send: target === "send" && !isShow.send,
    });
  };

  return (
    <Presenter
      title={title}
      text={text}
      isPreview={isPreview}
      isUploading={isUploading}
      addLabel={addLabel}
      labels={labels}
      isShow={isShow}
      addToLabel={addToLabel}
      removeLabel={removeLabel}
      sendPost={sendPost}
      onClickAddImage={onClickAddImage}
      onClickSave={onClickSave}
      onMouseEnter={onMouseEnter}
      setIsPreview={setIsPreview}
      setTitle={setTitle}
      setText={setText}
      setAddLabel={setAddLabel}
    />
  );
};
