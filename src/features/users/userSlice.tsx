import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

type UserType = {
  user: {
    uid: string;
    username: string;
    comment: string;
    avatar: string;
    twitterName: string;
    githubName: string;
    blogUrl: string;
    likedPosts: string[];
  };
};

const initialState: UserType = {
  user: {
    uid: "",
    username: "",
    comment: "",
    avatar: "",
    twitterName: "",
    githubName: "",
    blogUrl: "",
    likedPosts: [],
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
        likedPosts: [],
      };
    },
    updateUserName: (state, action) => {
      state.user.username = action.payload.username;
    },
    updateUserProfile: (state, action) => {
      state.user = action.payload;
    },
    addLikedPosts: (state, action) => {
      state.user.likedPosts.push(action.payload.postId);
    },
    removeLikedPosts: (state, action) => {
      state.user.likedPosts = state.user.likedPosts.filter(
        (item) => item !== action.payload.postId
      );
    },
  },
});

export const {
  login,
  logout,
  updateUserName,
  updateUserProfile,
  addLikedPosts,
  removeLikedPosts,
} = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;
export default userSlice.reducer;
