import { useState } from 'react'
import { selectUser, updateUserName } from "./features/users/userSlice"
import { useDispatch, useSelector } from "react-redux"
import { auth } from "./firebase"

export const RegisterPopup = () => {
  const [username, setUsername] = useState("")
  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  const updateDisplayName = async () => {
    const currentUser = await auth.currentUser

    currentUser?.updateProfile({
      displayName: username
    }).catch(err => {
      console.error(err)
    })

    dispatch(updateUserName({
      displayName: username
    }))
  }

  return (
    <div>
      { user.uid &&  
        <div>
          <form onSubmit={updateDisplayName}>
            <p>あなたの名前を教えてください</p>
            <div>
              <label htmlFor="userName">ユーザ名</label>
              <input 
                id="userName" 
                placeholder={user.displayName}
                value={username}
                onChange={e => setUsername(e.target.value)}
                autoFocus
              />
            </div>
            <button type="submit">登録する</button>
          </form>
        </div>
      }
    </div>
  )
}
