import { VFC } from "react";
import { useHistory } from "react-router-dom";

import firebase from "firebase/app";

import { toastHandler } from "../../../utils/toast";
import { db, auth } from "../../../libs/firebase";

import { Presenter } from "./Presenter";

type Props = {
  modalHandler: () => void;
};

const createUsersCollection = (user: firebase.User | null) => {
  db.collection("users").add({
    uid: user!.uid,
    username: user!.displayName,
    avatar: user!.photoURL,
    comment: "",
    likedPosts: [],
    githubName: "",
    twitterName: "",
    blogUrl: "",
  });
};

export const Auth: VFC<Props> = ({ modalHandler }) => {
  const history = useHistory();

  const signIn = (
    provider:
      | firebase.auth.GithubAuthProvider
      | firebase.auth.GoogleAuthProvider
  ) => {
    auth
      .signInWithPopup(provider)
      .then(async ({ user }) => {
        modalHandler();
        // もしサインインしたユーザのidをもつコレクションが存在しなければusersコレクションに追加する
        let userId = "";
        const fetchUser = await db
          .collection("users")
          .where("uid", "==", `${user?.uid}`);
        const res = await fetchUser.get();
        res.forEach((doc) => {
          if (doc.id) {
            userId = doc.id;
          }
        });
        if (!userId) {
          createUsersCollection(user);
        }
        history.push(`/`);
        toastHandler("success", "Sign In!!");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return <Presenter modalHandler={modalHandler} signIn={signIn} />;
};
