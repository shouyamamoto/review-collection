import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { db, auth } from "./libs/firebase";
import { login, logout } from "./features/users/userSlice";
import { Home } from "./components/pages/Home/Home";
import { Profile } from "./components/pages/Profile/Profile";
import { ProfileEdit } from "./components/pages/ProfileEdit/ProfileEdit";
import { ArticlesDashboard } from "./components/pages/ArticlesDashboard/ArticlesDashboard";
import { CreatePost } from "./components/pages/CreatePost/CreatePost";
import { EditPost } from "./components/pages/EditPost/EditPost";
import { SinglePostPage } from "./components/pages/SinglePostPage/SinglePostPage";
import { Page404 } from "./components/pages/Page404/Page404";
import { Header } from "./components/organisms/Header";
import { Footer } from "./components/organisms/Footer";
import { GlobalStyle } from "./Themes/GlobalStyle";

const App: React.VFC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        let id = "";
        db.collection("users")
          .where("uid", "==", `${authUser.uid}`)
          .get()
          .then((snapshot) => {
            snapshot.forEach((doc) => {
              id = doc.id;
            });
          })
          .then(() => {
            if (id) {
              db.collection("users")
                .doc(id)
                .get()
                .then((doc) => {
                  dispatch(
                    login({
                      uid: doc.data()!.uid,
                      username: doc.data()!.username,
                      avatar: doc.data()!.avatar,
                      comment: doc.data()!.comment,
                      githubName: doc.data()!.githubName,
                      twitterName: doc.data()!.twitterName,
                      blogUrl: doc.data()!.blogUrl,
                      likedPosts: doc.data()!.likedPosts,
                    })
                  );
                });
            } else {
              dispatch(
                login({
                  uid: authUser.uid,
                  username: authUser.displayName,
                  avatar: authUser.photoURL,
                  comment: "",
                  githubName: "",
                  twitterName: "",
                  blogUrl: "",
                  likedPosts: [],
                })
              );
            }
          });
      } else {
        dispatch(logout());
      }
    });
    return () => unSub();
  }, [dispatch]);

  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/:userId" component={Profile} />
          <Route
            exact
            path="/:userId/profile/settings"
            component={ProfileEdit}
          />
          <Route exact path="/articles/new" component={CreatePost} />
          <Route
            exact
            path="/:userId/articles/:postId/edit"
            component={EditPost}
          />
          <Route
            exact
            path="/:userId/dashboard"
            component={ArticlesDashboard}
          />
          <Route
            exact
            path="/:userId/articles/:postId"
            component={SinglePostPage}
          />
          <Route component={Page404} />
        </Switch>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
