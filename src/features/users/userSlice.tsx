import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import { toast } from "react-toastify"

const initialState = {
  user: {
    uid: "",
    displayName: "",
    photoUrl: "",
    intro: "",
  }
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload
      toast.success("login!", {position: toast.POSITION.BOTTOM_RIGHT })
    },
    logout: (state) => {
      state.user = {uid: "", displayName: "", photoUrl: "", intro: ""}
    },
    updateUserName: (state, action) => {
      state.user.displayName = action.payload.displayName
    }
  },
})

export const { login, logout, updateUserName } = userSlice.actions

export const selectUser = (state: RootState) => state.user.user;

export default userSlice.reducer
