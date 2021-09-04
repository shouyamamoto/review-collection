import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  user: {
    uid: "",
    displayName: "",
    photoUrl: "",
  }
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload
    },
    logout: (state) => {
      state.user = {uid: "", displayName: "", photoUrl: ""}
    }
  },
})

export const { login, logout } = userSlice.actions

export default userSlice.reducer
