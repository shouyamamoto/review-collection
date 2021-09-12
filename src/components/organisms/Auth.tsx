import { VFC } from 'react'
import { useHistory } from "react-router-dom"
import { auth, githubProvider, googleProvider } from "../../firebase"
import { FaGithub, FaGoogle } from "react-icons/fa"
import styled from "styled-components"
import { COLOR } from "../../Themes/Color"
import LoginImg from "../../images/logo.svg"
import { toast } from "react-toastify"
import { SignInButton } from "../atom/button/SignInButton"
import { DEVICE } from "../../Themes/Device"

type Props = {
  modalHandler: () => void;
}

export const Auth:VFC<Props> = ({ modalHandler }) => {
  const history = useHistory()

  const signIn = (provider: any):void => {
    auth.signInWithPopup(provider)
      .then(() => {
        modalHandler()
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
        <ul>
          <LoginItem>
            <SignInButton onClick={() => signIn(githubProvider)} icon={<StyledFaGithub />}>Sign in with Github</SignInButton>
          </LoginItem>
          <LoginItem>
            <SignInButton onClick={() => signIn(googleProvider)} icon={<StyledFaGoogle />}>Sign in with Google</SignInButton>
          </LoginItem>
        </ul>
      </ModalInner>
    </Modal>
  )
}

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
  background-color: ${COLOR.WHITE}; 
  width: 90vw;
  max-width: 600px;
  height: 400px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-shadow: 0 2.5rem 2rem -2rem hsl(200 50% 20% / 40%);


  @media ${DEVICE.tabletL} {
    width: 70vw;
  }
`

const StyledModalTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  color: ${COLOR.PRIMARY};
  margin: 32px 0;
`

const LoginItem = styled.li`
  &:not(:last-child) {
    padding-bottom: 20px;
  }
`

const StyledFaGithub = styled(FaGithub)`
  margin-right: 10px;
`
const StyledFaGoogle = styled(FaGoogle)`
  margin-right: 10px;
`