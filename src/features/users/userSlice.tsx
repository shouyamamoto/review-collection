import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

const initialState = {
  user: {
    uid: "",
    username: "",
    comment: "",
    avatar: "",
    twitterName: "",
    githubName: "",
    blogUrl: "",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = {
        uid: "",
        username: "",
        comment: "",
        avatar: "",
        twitterName: "",
        githubName: "",
        blogUrl: "",
      };
    },
    updateUserName: (state, action) => {
      state.user.username = action.payload.username;
    },
    updateUserProfile: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { login, logout, updateUserName, updateUserProfile } =
  userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;

export default userSlice.reducer;
