import React from 'react'
import { auth, githubProvider, googleProvider } from "./firebase"
import { FaGithub, FaGoogle } from "react-icons/fa"
import styled from "styled-components"
import { COLOR } from "./Themes/Color"

export const Auth = ({ onClickModalHandler }: any) => {
  const signIn = async (provider: any) => {
    await auth.signInWithPopup(provider)
      .then(() => {
        window.location.href = "/"
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <Modal>
      <ModalMask onClick={onClickModalHandler} />
      <ModalInner>
        <StyledModalTitle>- Login -</StyledModalTitle>
        <LoginList>
          <LoginItem><StyledButton onClick={() => signIn(githubProvider)}><StyledFaGithub /> Githubでログインする</StyledButton></LoginItem>
          <LoginItem><StyledButton onClick={() => signIn(googleProvider)}><StyledFaGoogle /> Googleでログインする</StyledButton></LoginItem>
        </LoginList>
      </ModalInner>
    </Modal>
  )
}

const StyledModalTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 60px;
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
  background-color: rgba(0,0,0, 0.3);
`

const ModalInner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 40px 100px;
  background-color: ${COLOR.WHITE}; 
  width: 400px;
  height: 400px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const LoginList = styled.ul``

const LoginItem = styled.li`
  padding: 10px;
`

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  border: none;
  width: 30vw;
  height: 60px;
  font-size: 18px;
  transition: background-color 0.3s, color 0.3s;

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