import { createSlice } from "@reduxjs/toolkit"

type InitialStateType = {
  uid: string;
  displayName: string;
  avatar: string;
}

const initialState: InitialStateType = {
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
