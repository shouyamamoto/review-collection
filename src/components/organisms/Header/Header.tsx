import { VFC, useState, useCallback, memo } from "react";
import { useHistory, useLocation } from "react-router-dom";

import { auth } from "../../../libs/firebase";
import { Auth } from "../Auth/Auth";
import logo from "../../../images/logo.svg";

import { PrimaryButton } from "../../atom/button/PrimaryButton";
import { IconWithPostButton } from "../../molecules/IconWithPostButton/IconWithPostButton";
import { index as Link } from "../../atom/link";
import { SearchInputForm } from "../../molecules/SearchInputForm/SearchInputForm";
import { useCurrentUser } from "../../../hooks/useCurrentUser";

import { StyledHeaderInner, StyledLogo } from "./Styles";

export const Header: VFC = memo(() => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const [search, setSearch] = useState<string>("");
  const history = useHistory();
  const location = useLocation();
  const { currentUser } = useCurrentUser();

  const signOut = useCallback(async () => {
    setIsOpenMenu(false);
    await auth.signOut();
    history.push("/");
  }, [history]);

  const onClickSearch = () => {
    history.push(`/topics?search=${search}`);
    setSearch("");
  };

  const onClickMenuHandler = () => setIsOpenMenu(!isOpenMenu);
  const onClickCloseMenu = () => setIsOpenMenu(false);
  const onClickModalHandler = () => setIsOpenModal(!isOpenModal);
  const onClickOpenSearch = () => setIsOpenSearch(!isOpenSearch);

  return (
    <>
      <header>
        <StyledHeaderInner>
          <Link to="/">
            <StyledLogo src={logo} alt="" onClick={onClickCloseMenu} />
          </Link>
          {currentUser.uid ? (
            <IconWithPostButton
              user={currentUser}
              isOpenMenu={isOpenMenu}
              onClick={onClickMenuHandler}
              onClose={onClickCloseMenu}
              onClickOpenSearch={onClickOpenSearch}
              signOut={signOut}
              pathname={location.pathname}
            />
          ) : (
            <PrimaryButton onClick={onClickModalHandler}>Sign In</PrimaryButton>
          )}
        </StyledHeaderInner>
        <SearchInputForm
          isOpen={isOpenSearch}
          inputValue={search}
          onChange={setSearch}
          onClickSearch={onClickSearch}
          onClickOpenSearch={onClickOpenSearch}
        />
      </header>
      {isOpenModal && <Auth modalHandler={onClickModalHandler} />}
    </>
  );
});
