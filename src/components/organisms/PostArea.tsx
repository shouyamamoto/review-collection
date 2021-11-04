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
    likedUsers?: string[];
    labels: string[];
  };
};

const labelSpecifications = {
  maxTextLength: 12,
  maxLength: 5,
};

export const PostArea: VFC<Props> = ({ editPostData }) => {
  const user = useSelector(selectUser);
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
            likedUsers: [],
            labels: labels,
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
    [history, user, editPostData?.postId, labels]
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
          labels: labels,
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

  const checkLabelLength = () => {
    return labels.length < labelSpecifications.maxLength;
  };

  const checkLabelTextLength = (label: string) => {
    return label.length <= labelSpecifications.maxTextLength;
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
          onChangeLabel={(e) => {
            const newLabel = e.target.value;
            if (!checkLabelTextLength(newLabel)) return;
            setAddLabel(e.target.value);
          }}
          addToLabel={addToLabel}
          removeLabel={removeLabel}
          checkLabelLength={checkLabelLength}
          addLabel={addLabel}
          labels={labels}
        />
        <PostButtons
          title={title}
          text={text}
          onClickPreview={() => setIsPreview(!isPreview)}
          sendPost={sendPost}
          onClickAddImage={onClickAddImage}
          onClickSave={onClickSave}
          onMouseEnter={onMouseEnter}
          isShow={isShow}
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
