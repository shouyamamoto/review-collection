import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  uid: "",
  displayName: "",
  avatar: "",
}

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
})

export default userSlice.reducer
