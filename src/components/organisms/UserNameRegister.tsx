import { useState, memo } from 'react'
import { selectUser, updateUserName } from "../../features/users/userSlice"
import { useDispatch, useSelector } from "react-redux"
import { auth } from "../../firebase"
import styled from "styled-components"
import { COLOR } from "../../Themes/Color"
import Logo from "../../images/header-logo.svg"
import { toast } from "react-toastify"
import { InputName } from "../molecules/InputName"

type NoteProps = {
  isValid: boolean;
}

const userNameValid = {
  maxLength: 15,
  minLength: 2,
  errorMessage: "※ユーザー名は2文字以上15文字以下にしてください。",
}

export const UserNameRegister = memo(() => {
  const [inputUsername, setInputUsername] = useState("")
  const [isOpenModal, setIsOpenModal] = useState(false)
  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  const updateDisplayName = async () => {
    const currentUser = await auth.currentUser

    currentUser?.updateProfile({
      displayName: inputUsername
    }).then(() => {
      toast.success(`WellCome ${currentUser.displayName}`, {position: toast.POSITION.BOTTOM_RIGHT })
    })
    .catch(err => {
      console.error(err)
    })

    dispatch(updateUserName({
      displayName: inputUsername
    }))
  }

  const isUserNameValid = () => {
    return inputUsername.length <= userNameValid.maxLength && inputUsername.length >= userNameValid.minLength
  }

  const handleOnChange = (e: any) => {
    setInputUsername(e.target.value)
  }

  return (
    <>
    { user.uid &&  
    <StyledModal>
      <StyledModalMask />
        <StyledModalInner>
          <StyledForm onSubmit={updateDisplayName}>
            <StyledLogo src={Logo} alt="" width="320" />
            <StyledInputArea>
              <InputName inputUsername={inputUsername} handleChange={handleOnChange}/>
              <StyledUsernameNote isValid={!isUserNameValid()}>{userNameValid.errorMessage}</StyledUsernameNote>
            </StyledInputArea>
            <StyledRegisterButton type="submit" onClick={() => setIsOpenModal(!isOpenModal)} disabled={!isUserNameValid()}>登録する</StyledRegisterButton>
          </StyledForm>
        </StyledModalInner>
    </StyledModal>
    }
    </>
  )
})

const StyledLogo = styled.img`
  text-align: center;
  width: 80%;
  max-width: 320px;
  margin: 40px auto;
  display: block;
`

const StyledModal = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`

const StyledModalMask = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0, 0.3);
`

const StyledModalInner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 40px 100px;
  background-color: ${COLOR.WHITE}; 
  width: 500px;
  height: 400px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const StyledRegisterButton = styled.button`
  font-weight: bold;
  background-color: ${props => props.disabled ? COLOR.BACKGROUND : COLOR.PRIMARY};
  color: ${COLOR.WHITE};
  border: none;
  padding: 14px 40px;
  border-radius: 10px;
  width: 100%;

  &:hover {
    cursor: ${props => props.disabled ? "not-allowed" : "pointer"};
  }
`

const StyledUsernameNote = styled.p<NoteProps>`
  font-size: 14px;
  color: ${props => props?.isValid? "red" : "green"};
  margin-top: 10px;
`

const StyledForm = styled.form`
  width: 80%;
`

const StyledInputArea = styled.div`
  margin-bottom: 32px;
`