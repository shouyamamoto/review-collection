import { memo, VFC } from "react";
import MediaQuery from "react-responsive";

import { index as Link } from "../../atom/link";
import { DEVICE } from "../../../Themes/Device";
import { index as Icon } from "../../atom/icon/index";
import { PrimaryButton } from "../../atom/button/PrimaryButton";
import { IconMenu } from "../../molecules/IconMenu/IconMenu";

import { StyledIconArea } from "./Styles";

type Props = {
  user: {
    uid: string;
    username: string;
    avatar: string;
  };
  isOpenMenu: boolean;
  onClick: () => void;
  onClose?: () => void;
  onClickOpenSearch: () => void;
  signOut?: () => void;
  pathname: string;
};

export const IconWithPostButton: VFC<Props> = memo(
  ({
    user,
    isOpenMenu,
    onClick,
    onClose,
    onClickOpenSearch,
    signOut,
    pathname,
  }) => {
    return (
      <StyledIconArea>
        <Icon src={user.avatar} width="50" height="50" onClick={onClick} />
        <MediaQuery query={`${DEVICE.tabletL}`}>
          {pathname !== "/articles/new" && (
            <Link to={`/articles/new`}>
              <PrimaryButton onClick={onClose}>Add Post</PrimaryButton>
            </Link>
          )}
        </MediaQuery>
        {isOpenMenu && (
          <IconMenu
            user={user}
            onClick={onClick}
            signOut={signOut}
            onClickOpenSearch={onClickOpenSearch}
            pathname={pathname}
          />
        )}
      </StyledIconArea>
    );
  }
);
