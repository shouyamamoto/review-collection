import { VFC } from "react";

import {
  StyledMenu,
  StyledMenuItem,
  StyledLogoutIcon,
  StyledUserEditIcon,
  StyledBsPencil,
  StyledGrNotes,
  StyledProfileLink,
} from "./Styles";

type Props = {
  user: {
    uid: string;
    username: string;
  };
  onClick?: () => void;
  signOut?: () => void;
};

export const IconMenu: VFC<Props> = ({ user, onClick, signOut }) => {
  return (
    <StyledMenu>
      <StyledMenuItem onClick={onClick}>
        <StyledProfileLink
          to={`/${user.uid}`}
        >{`@ ${user.username}`}</StyledProfileLink>
      </StyledMenuItem>
      <StyledMenuItem onClick={onClick}>
        <StyledProfileLink to={`/articles/new`}>
          <StyledBsPencil />
          記事を投稿する
        </StyledProfileLink>
      </StyledMenuItem>
      <StyledMenuItem onClick={onClick}>
        <StyledProfileLink to={`/${user.uid}/dashboard`}>
          <StyledGrNotes />
          記事の管理
        </StyledProfileLink>
      </StyledMenuItem>
      <StyledMenuItem onClick={onClick}>
        <StyledProfileLink to={`/${user.uid}/profile/settings`}>
          <StyledUserEditIcon />
          プロフィール編集
        </StyledProfileLink>
      </StyledMenuItem>
      <StyledMenuItem onClick={signOut}>
        <StyledLogoutIcon />
        ログアウト
      </StyledMenuItem>
    </StyledMenu>
  );
};
