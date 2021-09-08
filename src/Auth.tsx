// import React from 'react'
import { useHistory } from "react-router-dom"
import { auth, githubProvider, googleProvider } from "./firebase"
import { FaGithub, FaGoogle } from "react-icons/fa"
import styled from "styled-components"
import { COLOR } from "./Themes/Color"
import LoginImg from "./images/header-logo.svg"
import { toast } from "react-toastify"

export const Auth = ({ modalHandler }: any) => {
  const history = useHistory()

  const signIn = (provider: any) => {
    auth.signInWithPopup(provider)
      .then(() => {
        modalHandler(false)
        history.push(`/`)
        toast.success("login!", {position: toast.POSITION.BOTTOM_RIGHT })
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <Modal>
      <ModalMask onClick={modalHandler} />
      <ModalInner>
        <img src={LoginImg} alt="" width="240" />
        <StyledModalTitle>レビューはきっと宝になる。</StyledModalTitle>
        <LoginList>
          <LoginItem><StyledButton onClick={() => signIn(githubProvider)}><StyledFaGithub />Sign in with Github</StyledButton></LoginItem>
          <LoginItem><StyledButton onClick={() => signIn(googleProvider)}><StyledFaGoogle />Sign in with Google</StyledButton></LoginItem>
        </LoginList>
      </ModalInner>
    </Modal>
  )
}

const StyledModalTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  color: ${COLOR.PRIMARY};
  margin: 32px 0;
`

const Modal = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`

const ModalMask = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0, 0.2);
`

const ModalInner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 40px 100px;
  background-color: ${COLOR.WHITE}; 
  width: 400px;
  height: 320px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-shadow: 0 2.5rem 2rem -2rem hsl(200 50% 20% / 40%);
`

const LoginList = styled.ul``

const LoginItem = styled.li`
  &:not(:last-child) {
    padding-bottom: 20px;
  }
`

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 14px 60px;
  border: none;
  width: 100%;
  font-size: 18px;
  transition: background-color 0.3s, color 0.3s;
  border-radius: 10px;
  background-color: ${COLOR.BACKGROUND};

  &:hover {
    cursor: pointer;
    background-color: ${COLOR.PRIMARY};
    color: ${COLOR.WHITE};
  }
`

const StyledFaGithub = styled(FaGithub)`
  margin-right: 10px;
`
const StyledFaGoogle = styled(FaGoogle)`
  margin-right: 10px;
`