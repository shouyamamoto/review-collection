import { memo, VFC } from "react";
import styled from "styled-components";
import MediaQuery from "react-responsive";
import { DEVICE } from "../../Themes/Device";
import { index as Icon } from "../atom/icon/index";
import { HeaderButton } from "../atom/button/HeaderButton";
import { IconMenu } from "../molecules/IconMenu";

type Props = {
  user: {
    uid: string;
    displayName: string;
    photoUrl: string;
  };
  isOpenMenu: boolean;
  onClick: () => void;
  signOut: () => void;
};

export const IconWithPostButton: VFC<Props> = memo(
  ({ user, isOpenMenu, onClick, signOut }) => {
    return (
      <StyledIconArea>
        <Icon src={user.photoUrl} width="50" height="50" onClick={onClick} />
        <MediaQuery query={`${DEVICE.tabletL}`}>
          <HeaderButton>Add Post</HeaderButton>
        </MediaQuery>
        {isOpenMenu && (
          <IconMenu user={user} onClick={onClick} signOut={signOut} />
        )}
      </StyledIconArea>
    );
  }
);

const StyledIconArea = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-around;

  @media ${DEVICE.tabletL} {
    width: 200px;
  }
`;
