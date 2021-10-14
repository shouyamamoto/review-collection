import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";

import { db, auth } from "./libs/firebase";
import { login, logout } from "./features/users/userSlice";
import { Home } from "./components/pages/Home";
import { Profile } from "./components/pages/Profile";
import { ProfileEdit } from "./components/pages/ProfileEdit";
import { CreatePost } from "./components/pages/CreatePost";
import { EditPost } from "./components/pages/EditPost";
import { SinglePostPage } from "./components/pages/SinglePostPage";
import { ArticlesDashboard } from "./components/pages/ArticlesDashboard";
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
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/:userId">
          <Profile />
        </Route>
        <Route exact path="/:userId/profile/settings">
          <ProfileEdit />
        </Route>
        <Route exact path="/articles/new">
          <CreatePost />
        </Route>
        <Route exact path="/:userId/articles/:postId/edit">
          <EditPost />
        </Route>
        <Route exact path="/:userId/dashboard">
          <ArticlesDashboard />
        </Route>
        <Route exact path="/:userId/articles/:postId">
          <SinglePostPage />
        </Route>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
