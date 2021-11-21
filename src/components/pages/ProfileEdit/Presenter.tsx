import { VFC } from "react";
import { Toaster } from "react-hot-toast";
import { Redirect } from "react-router";

import { ProfileEditArea } from "../../organisms/ProfileEditArea/ProfileEditArea";

import { Head } from "../../Head";

import { StyledProfileEditArea } from "./Styles";

type Props = {
  currentUser: {
    uid: string;
    username: string;
    comment: string;
    avatar: string;
    twitterName: string;
    githubName: string;
    blogUrl: string;
    likedPosts: string[];
  };
  userId: string;
};

export const Presenter: VFC<Props> = ({ currentUser, userId }) => {
  if (currentUser.uid !== userId) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <Head title="プロフィール設定" />
      <StyledProfileEditArea>
        <ProfileEditArea />
        <Toaster position="bottom-right" reverseOrder={false} />
      </StyledProfileEditArea>
    </>
  );
};
