import { VFC, useState, useCallback, memo } from "react";
import { selectUser } from "../../features/users/userSlice";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../../firebase";
import { Auth } from "./Auth";
import logo from "../../images/logo.svg";

import { PrimaryButton } from "../atom/button/PrimaryButton";
import { IconWithPostButton } from "../molecules/IconWithPostButton";
import { index as Link } from "../atom/link";

import { DEVICE } from "../../Themes/Device";

export const Header: VFC = memo(() => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const history = useHistory();
  const user = useSelector(selectUser);

  const signOut = useCallback(async () => {
    setIsOpenMenu(false);
    await auth.signOut();
    history.push("/");
  }, [history]);

  const onClickMenuHandler = () => setIsOpenMenu(!isOpenMenu);
  const onClickCloseMenu = () => setIsOpenMenu(false);
  const onClickModalHandler = () => setIsOpenModal(!isOpenModal);

  return (
    <>
      <header>
        <StyledHeaderInner>
          <Link to="/">
            <StyledLogo src={logo} alt="" onClick={onClickCloseMenu} />
          </Link>
          {user.uid ? (
            <IconWithPostButton
              user={user}
              isOpenMenu={isOpenMenu}
              onClick={onClickMenuHandler}
              onClose={onClickCloseMenu}
              signOut={signOut}
            />
          ) : (
            <PrimaryButton onClick={onClickModalHandler}>Sign In</PrimaryButton>
          )}
        </StyledHeaderInner>
      </header>
      {isOpenModal && <Auth modalHandler={onClickModalHandler} />}
    </>
  );
});

const StyledHeaderInner = styled.div`
  width: 90%;
  margin: 0 auto;
  max-width: 900px;
  padding: 24px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media ${DEVICE.laptopL} {
    max-width: 1200px;
  }
`;

const StyledLogo = styled.img`
  width: 200px;

  @media ${DEVICE.laptop} {
    width: 240px;
  }
`;
