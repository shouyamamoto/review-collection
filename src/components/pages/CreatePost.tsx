import { VFC, useState, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import firebase from "firebase/app";
import { db, storage } from "../../firebase";
import { selectUser } from "../../features/users/userSlice";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { uniqueFileName } from "../organisms/ProfileEditArea";

import TextareaAutosize from "react-textarea-autosize";
import styled from "styled-components";

import { PrimaryButton } from "../atom/button/PrimaryButton";

import { COLOR } from "../../Themes/Color";
import { DEVICE } from "../../Themes/Device";
import { isValidPost } from "../../Themes/Validations";
import { RiImageAddLine } from "react-icons/ri";
import { BiRightArrowCircle } from "react-icons/bi";

type PreviewProps = {
  isPreview: boolean;
};

export const CreatePost: VFC = () => {
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
    <>
      <StyledPostArea>
        <StyledTextAreaWrap>
          <StyledTitle
            value={title}
            onChange={(e) => onChangeInputState(e, setTitle)}
            placeholder="Title"
          />

          <TextAreaWrap>
            <StyledTextArea
              onChange={(e) => onChangeInputState(e, setText)}
              value={text}
              placeholder="マークダウン記法で書いてください"
              isPreview={isPreview}
            />
            <StyledMarkdownArea isPreview={isPreview}>
              <StyledReactMarkdown remarkPlugins={[gfm]} children={text} />
            </StyledMarkdownArea>
          </TextAreaWrap>

          <StyledButtonWrap>
            <StyledBiRightArrowCircle
              onClick={() => setIsPreview(!isPreview)}
            />

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
        </StyledTextAreaWrap>
      </StyledPostArea>
      <Toaster position="bottom-right" reverseOrder={false} />
    </>
  );
};

const TextAreaWrap = styled.div`
  display: flex;
  overflow: hidden;
`;

const StyledTextArea = styled(TextareaAutosize)<PreviewProps>`
  box-sizing: border-box;
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
  min-width: 90vw;
  flex-shrink: 1;
  flex-basis: 2;
  transition: transform 0.3s;
  transform: ${(props) =>
    props.isPreview ? "translateX(-100%)" : "translateX(0)"};

  @media ${DEVICE.laptop} {
    padding: 28px;
    min-width: 66vw;
  }
`;

const StyledReactMarkdown = styled(ReactMarkdown)`
  box-sizing: border-box;
  min-width: 90vw;
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
    min-width: 66vw;
  }
`;

const StyledRiImageAddLine = styled(RiImageAddLine)`
  width: 32px;
  height: 32px;
  background-color: ${COLOR.WHITE};
  color: ${COLOR.GRAY};
  padding: 10px;
  border-radius: 24px;
  transition: box-shadow 0.3s;

  &:hover {
    box-shadow: 0 3px 12px -1px #04253f40;
    color: ${COLOR.PRIMARY};
  }
`;

const StyledBiRightArrowCircle = styled(BiRightArrowCircle)`
  width: 32px;
  height: 32px;
  background-color: ${COLOR.WHITE};
  color: ${COLOR.GRAY};
  padding: 10px;
  border-radius: 24px;
  transition: box-shadow 0.3s;
  margin-right: 20px;

  &:hover {
    cursor: pointer;
    box-shadow: 0 3px 12px -1px #04253f40;
    color: ${COLOR.PRIMARY};
  }

  @media ${DEVICE.laptop} {
    margin-right: 0;
    margin-bottom: 20px;
  }
`;

const StyledLabel = styled.label`
  display: inline-block;
  text-align: center;
  padding: 5px 0;
  font-size: 12px;
  margin-right: 20px;

  &:hover {
    cursor: pointer;
  }

  @media ${DEVICE.laptop} {
    margin-right: 0;
    margin-bottom: 20px;
  }
`;

const StyledHiddenInput = styled.input`
  display: none;
`;

const StyledPostArea = styled.div`
  background-color: ${COLOR.BACKGROUND};
  min-height: 100vh;
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

const StyledMarkdownArea = styled.div<PreviewProps>`
  width: 90vw;
  margin: 0 auto;
  transition: transform 0.3s;
  transform: ${(props) =>
    props.isPreview ? "translateX(-100%)" : "translateX(0)"};
  height: ${(props) => (props.isPreview ? "100%" : "0")};

  @media ${DEVICE.laptop} {
    width: 66vw;
    max-width: ${DEVICE.laptop};
  }
`;

const StyledButtonWrap = styled.div`
  position: fixed;
  bottom: 0;
  right: 10%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 0 auto;
  padding: 20px 0;

  @media ${DEVICE.laptop} {
    top: 175px;
    right: 5%;
    flex-direction: column;
    justify-content: flex-start;
  }
  @media ${DEVICE.laptopL} {
    right: 7%;
  }
`;
