import { VFC, useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import styled from "styled-components";
import gfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import { Toaster } from "react-hot-toast";
import { format } from "date-fns";

import { db } from "../../libs/firebase";
import { index as CodeBlock } from "../atom/code/index";
import { index as Title } from "../atom/title/index";
import { index as Loading } from "../atom/loading/index";
import { Sidebar } from "../organisms/Sidebar";
import { COLOR } from "../../Themes/Color";
import { DEVICE } from "../../Themes/Device";
import { Page404 } from "./Page404";

type Props = {
  postId: string;
  uid: string;
  title: string;
  body: string;
  timestamp: any;
};

export const SinglePostPage: VFC = () => {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<Props>({
    postId: "",
    uid: "",
    title: "",
    body: "",
    timestamp: "",
  });
  const [author, setAuthor] = useState({
    uid: "",
    avatar: "",
    username: "",
    githubName: "",
    twitterName: "",
    blogUrl: "",
    comment: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const getPostData = async () => {
      const postData = await db.collection("posts").doc(postId);
      postData.get().then((doc) => {
        if (doc.exists) {
          setPost({
            postId: doc.id,
            uid: doc?.data()?.uid,
            title: doc?.data()?.title,
            body: doc?.data()?.body,
            timestamp: doc?.data()?.timestamp,
          });
        } else {
          setIsLoading(false);
          return;
        }
        const user = db
          .collection("users")
          .where("uid", "==", doc?.data()?.uid)
          .get();
        user.then((snapshot) => {
          snapshot.forEach((doc) => {
            setAuthor({
              uid: doc.data().uid,
              avatar: doc.data().avatar,
              username: doc.data().username,
              githubName: doc.data().githubName,
              twitterName: doc.data().twitterName,
              blogUrl: doc.data().blogUrl,
              comment: doc.data().comment,
            });
          });
          setIsLoading(false);
        });
      });
    };
    getPostData();
  }, [postId]);

  if (isLoading) {
    return <Loading width="60" height="60" />;
  }

  if (post.postId === "") {
    return <Page404 />;
  }

  return (
    <StyledSinglePostPage>
      <StyledTitleWrap>
        <StyledTitleInner>
          <Title headline="h1">{post.title}</Title>
          <StyledTimestamp>
            {format(post.timestamp.toDate(), "yyyy-MM-dd")} に公開
          </StyledTimestamp>
        </StyledTitleInner>
      </StyledTitleWrap>
      <StyledSinglePostPageInner>
        <StyledReactMarkdown
          remarkPlugins={[gfm]}
          children={post.body}
          components={{ code: CodeBlock }}
          className="preview"
        />
        <Sidebar
          location={location.pathname}
          uid={author.uid}
          avatar={author.avatar}
          username={author.username}
          githubName={author.githubName}
          twitterName={author.twitterName}
          blogUrl={author.blogUrl}
          comment={author.comment}
        />
      </StyledSinglePostPageInner>
      <Toaster position="bottom-right" reverseOrder={false} />
    </StyledSinglePostPage>
  );
};

const StyledSinglePostPage = styled.main`
  background-color: ${COLOR.BACKGROUND};
  display: grid;
  grid-template-columns: 100%;
  margin: 0 auto;
  width: 100%;
`;

const StyledSinglePostPageInner = styled.div`
  @media ${DEVICE.tabletL} {
    width: 95%;
    margin: 0 auto;
    min-height: 80vh;
  }

  @media ${DEVICE.laptop} {
    display: grid;
    grid-template-columns: 3fr 1fr;
    gap: 0 20px;
    width: 100%;
    max-width: 900px;
  }

  @media ${DEVICE.laptopL} {
    max-width: 1200px;
  }
`;

const StyledReactMarkdown = styled(ReactMarkdown)`
  padding: 60px 14px;
  border-bottom: 1px solid ${COLOR.BACKGROUND};
  background-color: ${COLOR.WHITE};
  margin-bottom: 40px;

  @media ${DEVICE.tabletL} {
    padding: 60px 40px;
    border-radius: 10px;
  }
`;

const StyledTitleWrap = styled.div`
  background-color: ${COLOR.BACKGROUND};
`;

const StyledTitleInner = styled.div`
  padding: 40px 14px 60px;

  @media ${DEVICE.tabletL} {
    padding: 40px 0;
    width: 95%;
    margin: 0 auto;
    text-align: left;
  }

  @media ${DEVICE.laptopL} {
    padding: 80px 0;
    width: 100%;
    max-width: 1200px;
  }
`;

const StyledTimestamp = styled.span`
  font-size: 12px;
  color: ${COLOR.GRAY};
`;
