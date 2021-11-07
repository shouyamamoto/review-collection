import { VFC, useState, useEffect, memo } from "react";
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroller";

import { Article } from "../molecules/Article";
import { db } from "../../libs/firebase";
import { index as LoadingIcon } from "../atom/loading/index";
import { index as Title } from "../atom/title/index";
import { UserNameRegister } from "../organisms/UserNameRegister";
import { selectUser } from "../../features/users/userSlice";
import { COLOR } from "../../Themes/Color";
import { DEVICE } from "../../Themes/Device";

type PostType = {
  uid: string;
  postId: string;
  title: string;
  body: string;
  timestamp: any;
  likedUsers: string[];
};

type UserType = {
  uid: string;
  username: string;
  avatar: string;
};

export const Home: VFC = memo(() => {
  const user = useSelector(selectUser);
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState<PostType[]>([
    {
      uid: "",
      postId: "",
      timestamp: null,
      title: "",
      body: "",
      likedUsers: [],
    },
  ]);
  const [users, setUsers] = useState<UserType[]>([
    {
      uid: "",
      username: "",
      avatar: "",
    },
  ]);
  const [oldestId, setOldestId] = useState("");
  const [lastDate, setLastDate] = useState("");

  useEffect(() => {
    getPosts();
    getUsers();
    getLast();
  }, []);

  const getLast = async () => {
    const res = await db
      .collection("posts")
      .orderBy("timestamp", "asc")
      .limit(1)
      .get();
    setOldestId(res.docs[0].id);
  };

  const getPosts = async () => {
    let fetchPosts = db
      .collection("posts")
      .where("status", "==", "release")
      .orderBy("timestamp", "desc");

    if (lastDate) {
      // リストの最後のidと全てのリストの最後のidが同じ場合は追加読み込みしない
      if (oldestId === posts[posts.length - 1].postId) {
        return;
      }
      fetchPosts = fetchPosts.startAfter(lastDate);
    }

    const res = await fetchPosts.limit(18).get();

    const postsData = res.docs.reduce(
      (acc: any, doc: any) => [
        ...acc,
        {
          postId: doc.id,
          uid: doc.data().uid,
          timestamp: doc.data().timestamp.toDate(),
          title: doc.data().title,
          body: doc.data().body,
          likedUsers: doc.data().likedUsers,
        },
      ],
      posts
    );

    setPosts(postsData);
    setLastDate(res.docs[res.docs.length - 1].data().timestamp.toDate());
  };

  const getUsers = async () => {
    await db
      .collection("users")
      .get()
      .then((snapshot) => {
        setUsers(
          snapshot.docs.map((doc) => ({
            uid: doc.data().uid,
            username: doc.data().username,
            avatar: doc.data().avatar,
          }))
        );

        setIsLoading(false);
      });
  };

  const extraUser = (
    postUid: string
  ): { uid: string; username: string; avatar: string } | undefined => {
    return users.find((user) => postUid === user.uid);
  };

  if (isLoading) {
    return (
      <StyledHomeLoadingInner>
        <LoadingIcon width="40" height="40" />
      </StyledHomeLoadingInner>
    );
  }

  return (
    <StyledHome>
      <StyledHomePosts>
        <StyledHomePostsInner>
          <Title headline="h1">Articles</Title>
          <InfiniteScroll
            pageStart={0}
            loadMore={getPosts}
            hasMore={oldestId !== posts[posts.length - 1].postId}
            initialLoad={false}
            loader={<LoadingIcon width="40" height="40" />}
            key={0}
          >
            <StyledHomePostsArea>
              {posts.map(
                (post) =>
                  post.postId !== "" && (
                    <Article
                      key={post.postId}
                      postId={post.postId}
                      uid={post.uid}
                      username={extraUser(post.uid)!.username}
                      avatar={extraUser(post.uid)!.avatar}
                      title={post.title}
                      body={post.body}
                      timestamp={post.timestamp}
                      likedUsers={post.likedUsers}
                    />
                  )
              )}
            </StyledHomePostsArea>
          </InfiniteScroll>
        </StyledHomePostsInner>
      </StyledHomePosts>

      {
        /* githubで初回サインインするとdisplayNameがないので、ここで登録させる */
        user.username === null && <UserNameRegister />
      }
      <Toaster position="bottom-right" reverseOrder={false} />
    </StyledHome>
  );
});

const StyledHome = styled.main``;

const StyledHomePosts = styled.div`
  background-color: ${COLOR.BACKGROUND};
`;

const StyledHomePostsInner = styled.div`
  width: 90%;
  margin: 0 auto;
  padding: 40px 0;
  min-height: 70vh;

  @media ${DEVICE.laptop} {
    padding: 60px 0;
    max-width: 1024px;
  }
`;

const StyledHomePostsArea = styled.ul`
  display: grid;
  grid-template-columns: 1fr;
  margin: 40px auto;

  @media ${DEVICE.mobileM} {
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }

  @media ${DEVICE.laptop} {
    grid-template-columns: 1fr 1fr 1fr;
    max-width: 1024px;
  }
`;

const StyledHomeLoadingInner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${COLOR.BACKGROUND};
  min-height: 90vh;
`;
