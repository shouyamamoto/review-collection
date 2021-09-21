import { VFC, useState, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import firebase from "firebase/app";
import { db, storage } from "../../firebase";
import { selectUser } from "../../features/users/userSlice";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import toast from "react-hot-toast";
import { uniqueFileName } from "../organisms/ProfileEditArea";

import TextareaAutosize from "react-textarea-autosize";
import styled from "styled-components";

import { PrimaryButton } from "../atom/button/PrimaryButton";

import { COLOR } from "../../Themes/Color";
import { DEVICE } from "../../Themes/Device";
import { isValidPost } from "../../Themes/Validations";
import { RiImageAddLine } from "react-icons/ri";

export const CreatePost: VFC = () => {
  const user = useSelector(selectUser);
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const sendPost = useCallback(
    async (title: string, text: string) => {
      await db
        .collection("posts")
        .add({
          uid: user.uid,
          username: user.username,
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
        (err) => {
          alert(err.message);
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
      <StyledTextAreaWrap>
        <StyledTitle
          value={title}
          onChange={(e) => onChangeInputState(e, setTitle)}
          placeholder="Title"
        />

        <StyledTextArea
          onChange={(e) => onChangeInputState(e, setText)}
          value={text}
          placeholder="マークダウン記法で書いてください"
        />

        <StyledButtonWrap>
          <StyledLabel>
            <StyledRiImageAddLine />
            <StyledHiddenInput type="file" onChange={onClickAddImage} />
          </StyledLabel>
          <PrimaryButton
            onClick={() => {
              sendPost(title, text);
            }}
            disabled={!isValidPost(title, text)}
          >
            投稿する
          </PrimaryButton>
        </StyledButtonWrap>

        <ul>
          <li></li>
        </ul>
      </StyledTextAreaWrap>

      <StyledMarkdownArea>
        <StyledReactMarkdown remarkPlugins={[gfm]} children={text} />
      </StyledMarkdownArea>
    </StyledPostArea>
  );
};

const StyledRiImageAddLine = styled(RiImageAddLine)`
  width: 32px;
  height: 32px;
  background-color: ${COLOR.WHITE};
  padding: 10px;
  border-radius: 24px;
  transition: box-shadow 0.3s;

  &:hover {
    box-shadow: 0 3px 12px -1px #04253f40;
  }
`;

const StyledLabel = styled.label`
  display: inline-block;
  text-align: center;
  padding: 5px 0;
  font-size: 12px;
  margin-right: 20px;
  color: ${COLOR.GRAY};

  &:hover {
    cursor: pointer;
  }
`;

const StyledHiddenInput = styled.input`
  display: none;
`;

const StyledPostArea = styled.div`
  display: flex;
  flex-flow: column;
  min-height: 100vh;
  background-color: ${COLOR.BACKGROUND};
`;

const StyledTextAreaWrap = styled.div`
  flex: 1;
  width: 90vw;
  margin: 0 auto;
  padding: 40px 0;

  @media ${DEVICE.laptop} {
    width: 66vw;
    max-width: ${DEVICE.laptop};
  }
`;

const StyledTitle = styled(TextareaAutosize)`
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  display: block;
  border: none;
  border-radius: 10px;
  outline: none;
  background-color: ${COLOR.TRANSPARENT};
  font-size: 20px;
  font-weight: bold;
  line-height: 1.8;
  margin-bottom: 20px;
  padding: 0 14px;
  resize: none;
`;

const StyledTextArea = styled(TextareaAutosize)`
  box-sizing: border-box;
  width: 100%;
  min-height: 50vh;
  display: block;
  border: none;
  border-radius: 10px;
  outline: none;
  background-color: ${COLOR.WHITE};
  font-size: 16px;
  line-height: 1.8;
  padding: 20px 14px;
  resize: none;

  @media ${DEVICE.laptop} {
    padding: 28px;
  }
`;

const StyledMarkdownArea = styled.div`
  width: 90vw;
  margin: 0 auto;
  padding: 40px 0;

  @media ${DEVICE.laptop} {
    width: 66vw;
    max-width: ${DEVICE.laptop};
  }
`;

const StyledReactMarkdown = styled(ReactMarkdown)`
  box-sizing: border-box;
  width: 100%;
  min-height: 50vh;
  display: block;
  border: none;
  border-radius: 10px;
  outline: none;
  background-color: ${COLOR.WHITE};
  font-size: 16px;
  line-height: 1.8;
  padding: 20px 14px;
  resize: none;

  @media ${DEVICE.laptop} {
    padding: 28px;
  }
`;

const StyledButtonWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 0 auto;
  padding: 40px 0;
`;
