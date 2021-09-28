import { useEffect } from "react";
import { db, auth } from "./firebase";
import { login, logout } from "./features/users/userSlice";
import { useDispatch } from "react-redux";
import { Home } from "./components/pages/Home";
import { Profile } from "./components/pages/Profile";
import { ProfileEdit } from "./components/pages/ProfileEdit";
import { CreatePost } from "./components/pages/CreatePost";
import { Header } from "./components/organisms/Header";
import { BrowserRouter, Route } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import { COLOR } from "./Themes/Color";

const GlobalStyle = createGlobalStyle`
* {
  line-height: 1.6;
  letter-spacing: 0.07em;
  padding: 0;
  margin: 0;
  list-style: none;
} 
ul,li {
  list-style: none;
  padding: 0;
  margin: 0;
}
a {
  text-decoration: none;
  color: black;
}
.preview > :first-child {
  margin-top: 0;
}
.preview > p {
  margin-top: 1.5rem;
}
.preview code {
  background-color: ${COLOR.BACKGROUND};
  padding: 2px 8px;
  border-radius: 4px;
  color: ${COLOR.CODE};
}
.preview blockquote {
  margin-top: 1.5rem;
  padding: 10px 20px;
  color: ${COLOR.GRAY};
  border-left: 4px solid ${COLOR.BACKGROUND};
}
.preview hr {
  margin: 1.5rem 0;
  background-color: ${COLOR.BACKGROUND};
  height: 2px;
  border: none;
}
.preview ul,
.preview ol {
  margin-top: 1.5rem;
}
.preview ul ul,
.preview ol ol {
  margin-top: 0;
}
.preview ul, 
.preview ul li {
  list-style: disc inside !important;
}
.preview ul li li{
  list-style: circle inside !important;
}
.preview ul li li li {
  list-style: disc inside !important;
}
.preview ol,
.preview ol li {
  list-style: decimal inside !important;
}
.preview ol li li {
  list-style: lower-roman inside !important;
}
.preview ol li li li{
  list-style: decimal inside !important;
}
.preview li {
  padding-left: 10px;
}
.preview h1 {
  border-bottom: 2px solid ${COLOR.BACKGROUND};
  padding: 0.4rem 0;
  margin-top: 2.4rem;
}
.preview h2 {
  border-bottom: 2px solid ${COLOR.BACKGROUND};
  padding: 0.4rem 0;
  margin-top: 2rem;
}
.preview h3,
.preview h4,
.preview h5,
.preview h6 {
  padding: 0.4rem 0;
  margin-top: 1.5rem;
}
.preview img {
  width: 100%;
  display: inline-block;
  margin: 0 auto;
}
.preview img + em {
  display: block;
  text-align: center;
  color: ${COLOR.GRAY};
  font-size: 12px;
}
.preview a + em {
  display: block;
  text-align: center;
  color: ${COLOR.GRAY};
  font-size: 12px;
}
.preview a {
  color: ${COLOR.PRIMARY};
}
.preview table {
  margin-top: 1.5rem;
}
.preview table, td, th {
  padding: 0.42rem;
  border-collapse: collapse;
  border: 1px solid ${COLOR.BACKGROUND};
} 
.preview thead {
  background-color: ${COLOR.BACKGROUND};
}
`;

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
        <Route exact path="/:userId/draft">
          <CreatePost />
        </Route>
      </BrowserRouter>
    </>
  );
};

export default App;
