import { VFC } from "react";
import { useState } from "react";
import { selectUser } from "../../features/users/userSlice";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../../firebase";
import { Auth } from "./Auth";
import logo from "../../images/logo.svg";

import { HeaderButton } from "../atom/button/HeaderButton";
import { IconWithPostButton } from "../molecules/IconWithPostButton";

import { DEVICE } from "../../Themes/Device";

export const Header: VFC = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const history = useHistory();
  const user = useSelector(selectUser);

  const signOut = async () => {
    await auth.signOut();
    history.push("/");
  };

  const onClickMenuHandler = () => setIsOpenMenu(!isOpenMenu);
  const onClickModalHandler = () => setIsOpenModal(!isOpenModal);

  return (
    <>
      <header>
        <StyledHeaderInner>
          <Link to="/">
            <StyledLogo src={logo} alt="" />
          </Link>
          {user.uid ? (
            <IconWithPostButton
              user={user}
              isOpenMenu={isOpenMenu}
              onClick={onClickMenuHandler}
              signOut={signOut}
            />
          ) : (
            <HeaderButton onClick={onClickModalHandler}>Sign In</HeaderButton>
          )}
        </StyledHeaderInner>
      </header>
      {isOpenModal && <Auth modalHandler={onClickModalHandler} />}
    </>
  );
};

const StyledHeaderInner = styled.div`
  width: 90%;
  margin: 0 auto;
  max-width: 900px;
  padding: 24px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledLogo = styled.img`
  width: 200px;

  @media ${DEVICE.laptop} {
    width: 240px;
  }
`;
