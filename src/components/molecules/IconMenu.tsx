import { VFC } from "react";
import { Link } from "react-router-dom";
import { FiLogOut, FiUserCheck } from "react-icons/fi";
import { BsPencil } from "react-icons/bs";
import { GrNotes } from "react-icons/gr";
import styled from "styled-components";
import { COLOR } from "../../Themes/Color";
import { DEVICE } from "../../Themes/Device";

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
        <StyledProfileLink to={`/articles/dashboard`}>
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

const StyledMenu = styled.ul`
  position: absolute;
  top: 60px;
  right: 20px;
  z-index: 9999;
  box-shadow: 0 3px 12px -1px #04253f40;
  border-radius: 10px;
  width: 200px;
  background-color: ${COLOR.WHITE};

  @media ${DEVICE.tabletL} {
    right: 140px;
    width: 240px;
  }
`;

const StyledMenuItem = styled.li`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 14px;

  &:first-child {
    border-bottom: 1px solid #04253f40;
  }

  &:last-child {
    padding: 14px 10px 14px 20px;
    border-top: 1px solid #04253f40;
  }

  &:hover {
    cursor: pointer;
    background-color: #f1f5f9;
  }
`;

const StyledLogoutIcon = styled(FiLogOut)`
  padding-right: 10px;
`;
const StyledUserEditIcon = styled(FiUserCheck)`
  padding-right: 10px;
`;
const StyledBsPencil = styled(BsPencil)`
  padding-right: 10px;
`;
const StyledGrNotes = styled(GrNotes)`
  padding-right: 10px;
`;

const StyledProfileLink = styled(Link)`
  display: block;
  width: 100%;
  padding: 14px 10px 14px 20px;
  color: ${COLOR.BLACK};
  text-decoration: none;
`;
