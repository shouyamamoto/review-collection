import { VFC, useState } from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import firebase from "firebase/app";
import { db } from "../../firebase";
import { selectUser } from "../../features/users/userSlice";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import toast from "react-hot-toast";

import TextareaAutosize from "react-textarea-autosize";
import styled from "styled-components";

import { PrimaryButton } from "../atom/button/PrimaryButton";

import { COLOR } from "../../Themes/Color";
import { DEVICE } from "../../Themes/Device";

export const CreatePost: VFC = () => {
  const user = useSelector(selectUser);
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const sendPost = async (title: string, text: string) => {
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
  };

  return (
    <StyledPostArea>
      <StyledTextAreaWrap>
        <StyledTitle
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />

        <StyledTextArea
          onChange={(e) => {
            setText(e.target.value);
          }}
          value={text}
          placeholder="マークダウン記法で書いてください"
        />

        <StyledButtonWrap>
          <PrimaryButton
            onClick={() => {
              sendPost(title, text);
            }}
          >
            投稿する
          </PrimaryButton>
        </StyledButtonWrap>
      </StyledTextAreaWrap>

      <StyledMarkdownArea>
        <StyledReactMarkdown remarkPlugins={[gfm]} children={text} />
      </StyledMarkdownArea>
    </StyledPostArea>
  );
};

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
  margin: 0 auto;
  padding: 40px 0;
`;
