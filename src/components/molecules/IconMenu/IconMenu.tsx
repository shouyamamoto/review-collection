import { VFC } from "react";

import {
  StyledMenu,
  StyledMenuItem,
  StyledLogoutIcon,
  StyledUserEditIcon,
  StyledBsPencil,
  StyledGrNotes,
  StyledProfileLink,
  StyledFiSearch,
} from "./Styles";

type Props = {
  user: {
    uid: string;
    username: string;
  };
  onClick: () => void;
  signOut?: () => void;
  onClickOpenSearch: () => void;
  pathname: string;
};

export const IconMenu: VFC<Props> = ({
  user,
  onClick,
  onClickOpenSearch,
  signOut,
  pathname,
}) => {
  const menuItems = [
    {
      to: "/articles/new",
      icon: <StyledBsPencil />,
      text: "記事を投稿する",
    },
    {
      to: `/${user.uid}/dashboard`,
      icon: <StyledGrNotes />,
      text: "記事の管理",
    },
    {
      to: pathname,
      icon: <StyledFiSearch />,
      text: "記事を検索する",
    },
    {
      to: `/${user.uid}/profile/settings`,
      icon: <StyledUserEditIcon />,
      text: "プロフィール編集",
    },
  ];

  return (
    <StyledMenu>
      {/* ユーザのプロフィール */}
      <StyledMenuItem onClick={onClick}>
        <StyledProfileLink
          to={`/${user.uid}`}
        >{`@ ${user.username}`}</StyledProfileLink>
      </StyledMenuItem>
      {/* 投稿や管理などのアクション */}
      {menuItems.map((item) => (
        <StyledMenuItem
          key={item.text}
          onClick={
            item.text === "記事を検索する"
              ? () => {
                  onClick();
                  onClickOpenSearch();
                }
              : onClick
          }
        >
          <StyledProfileLink to={item.to}>
            {item.icon}
            {item.text}
          </StyledProfileLink>
        </StyledMenuItem>
      ))}
      {/* ログアウト */}
      <StyledMenuItem onClick={signOut}>
        <StyledLogoutIcon />
        ログアウト
      </StyledMenuItem>
    </StyledMenu>
  );
};
