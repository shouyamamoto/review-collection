import { useEffect } from "react";
import { db, auth } from "./firebase";
import { login, logout } from "./features/users/userSlice";
import { useDispatch } from "react-redux";
import { Home } from "./components/pages/Home";
import { Profile } from "./components/pages/Profile";
import { ProfileEdit } from "./components/pages/ProfileEdit";
import { Header } from "./components/organisms/Header";
import { BrowserRouter, Route } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const GlobalStyle = createGlobalStyle`
* {
  line-height: 1.6;
  letter-spacing: 0.07em;
  padding: 0;
  margin: 0;
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
`;

const App: React.VFC = () => {
  const dispatch = useDispatch();

  // ログイン時に名前を入力
  // 名前を入力
  // shouyamamotoと入力
  // アイコンメニューではundefined
  // Profileもundefined
  // 編集画面ではshouyamamotoと表示される
  // 編集画面にいったらshouyamamotoとアイコンに表示される
  // Profileにうつるとshouyamamotoと表示される

  // ログインしなおしてもちゃんと表示される
  // 名前変更
  // 変更したらProfileにも表示される、メニューにも表示される
  // アイコン変更しても表示される

  // ログインし直す
  // 前のアイコンと名前が表示される
  // 変更するところではちゃんと表示される
  // Profileでは前のやつ

  // やること
  // アイコンメニューを確認する

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
      </BrowserRouter>
      <ToastContainer autoClose={2000} />
    </>
  );
};

export default App;
