import { useState } from "react"
import { selectUser } from "./features/users/userSlice"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import logo from "./images/logo.png"
import styled from "styled-components"
import { FiLogOut, FiUserCheck } from "react-icons/fi"
import { COLOR } from "./Themes/Color"
import { auth } from "./firebase"
import { Auth } from "./Auth"

export const Header = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false)
  const [isOpenModal, setIsOpenModal] = useState(false)
  const user = useSelector(selectUser)

  const signOut = async () => {
    await auth.signOut()
    window.location.href = "/"
  }
  
  const onClickMenuHandler = () => setIsOpenMenu(!isOpenMenu)
  const onClickModalHandler = () => setIsOpenModal(!isOpenModal)

  return (
    <>
      <header>
        <StyledHeaderInner>
          <Link to="/"><img src={logo} alt="Review-collection" width="80" height="80"/></Link>
        { user.uid 
        ? 
          <StyledIconArea>
            <StyledIcon src={user.photoUrl} alt="" width="50" height="50" onClick={onClickMenuHandler} /> 
            <StyledPostBtn>Add Post</StyledPostBtn>
            { isOpenMenu && 
              <StyledMenu>
                <StyledMenuItem onClick={onClickMenuHandler}><StyledProfileLink to={`/${user.uid}`}>{`@ ${user.displayName}`}</StyledProfileLink></StyledMenuItem>
                <StyledMenuItem><StyledProfileLink to={`/${user.uid}/edit`}><StyledUserEditIcon />プロフィール編集</StyledProfileLink></StyledMenuItem>
                <StyledMenuItem onClick={signOut}><StyledLogoutIcon />ログアウト</StyledMenuItem>
              </StyledMenu>
            }
          </StyledIconArea>
        : <StyledLoginBtn onClick={onClickModalHandler}>Login</StyledLoginBtn>
        }
        </StyledHeaderInner>
      </header>
      {isOpenModal && <Auth onClickModalHandler={onClickModalHandler} />}
    </>
  )
}

const StyledHeaderInner = styled.div`
  width: 90%;
  margin: 0 auto;
  max-width: 900px;
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const StyledIconArea = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`

const StyledIcon = styled.img`
  border-radius: 50%;
  margin-right: 30px;
  &:hover {
    cursor: pointer;
  }
`

const StyledMenu = styled.ul`
  position: absolute;
  top: 50px;
  right: 180px;
  box-shadow: 0 3px 12px -1px #04253f40;
  border-radius: 10px;
  width: 230px;
`

const StyledMenuItem = styled.li`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 13px;

  &:last-child {
    padding: 14px 10px 14px 20px;
  }
  
  &:hover {
    cursor: pointer;
    background-color: #f1f5f9;
  }
`

const StyledLogoutIcon = styled(FiLogOut)`
  padding-right: 10px;
`
const StyledUserEditIcon = styled(FiUserCheck)`
  padding-right: 10px;
`

const StyledLoginBtn = styled.button`
  background-color: ${COLOR.PRIMARY};
  border-radius: .45rem;
  border: none;
  color: ${COLOR.WHITE};
  padding: 14px 32px;
  font-weight: bold; 

  &:hover {
    cursor: pointer;
  }
`

const StyledPostBtn = styled.button`
  background-color: ${COLOR.PRIMARY};
  border-radius: .45rem;
  border: none;
  color: ${COLOR.WHITE};
  padding: 14px 20px;
  font-weight: bold;

  &:hover {
    cursor: pointer;
  }
`

const StyledLink = styled(Link)`
  display: block;
  color: ${COLOR.WHITE};
  text-decoration: none;
  padding: 14px 32px;
  font-weight: bold;

  &:hover {
    cursor: pointer;
  }
`

const StyledProfileLink = styled(Link)`
  display: block;
  width: 100%;
  padding: 14px 10px 14px 20px;
  color: ${COLOR.BLACK};
  text-decoration: none;
`
