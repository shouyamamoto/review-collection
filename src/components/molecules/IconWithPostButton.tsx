import { memo, VFC } from "react";
import styled from "styled-components";
import MediaQuery from "react-responsive";
import { index as Link } from "../atom/link";
import { DEVICE } from "../../Themes/Device";
import { index as Icon } from "../atom/icon/index";
import { PrimaryButton } from "../atom/button/PrimaryButton";
import { IconMenu } from "../molecules/IconMenu";

type Props = {
  user: {
    uid: string;
    username: string;
    avatar: string;
  };
  isOpenMenu: boolean;
  onClick?: () => void;
  onClose?: () => void;
  signOut?: () => void;
};

export const IconWithPostButton: VFC<Props> = memo(
  ({ user, isOpenMenu, onClick, onClose, signOut }) => {
    return (
      <StyledIconArea>
        <Icon src={user.avatar} width="50" height="50" onClick={onClick} />
        <MediaQuery query={`${DEVICE.tabletL}`}>
          <Link to={`/articles/new`}>
            <PrimaryButton onClick={onClose}>Add Post</PrimaryButton>
          </Link>
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

  @media ${DEVICE.tabletL} {
    width: 220px;
    display: grid;
    grid-template-columns: auto auto;
    align-items: center;
  }
`;
