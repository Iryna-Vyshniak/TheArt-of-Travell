import { createSlice } from '@reduxjs/toolkit';

import { authSignUpUser, authSignInUser, authLogOutUser, currentState } from './authOperation';

const pending = (state) => {
  state.isUserFetching = true;
};
const rejected = (state, { payload }) => {
  console.log(payload);
  state.isUserFetching = false;
  state.isLoggedIn = false;
};

const initialState = {
  isLoggedIn: false,
  isUserFetching: false,
  user: {
    uid: null,
    email: null,
    name: null,
    avatar: null,
    posts: [],
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: (builder) =>
    builder
      .addCase(authSignUpUser.fulfilled, (state, { payload }) => {
        state.user.uid = payload.uid;
        state.user.email = payload.email;
        state.user.name = payload.displayName;
        state.user.avatar = payload.photo;
        state.isLoggedIn = true;
        state.isUserFetching = false;
      })
      .addCase(authSignInUser.fulfilled, (state, { payload }) => {
        state.user.uid = payload.uid;
        state.user.email = payload.email;
        state.user.name = payload.displayName;
        state.user.avatar = payload.photoURL;
        state.isLoggedIn = true;
        state.isUserFetching = false;
      })
      .addCase(currentState.fulfilled, (state, { payload }) => {
        state.user.uid = payload.currentUser.uid;
        state.user.email = payload.currentUser.email;
        state.user.name = payload.currentUser.displayName;
        state.user.avatar = payload.currentUser.photo;
        state.isLoggedIn = payload.loggedIn;
      })
      .addCase(authLogOutUser.fulfilled, () => ({ ...initialState }))
      .addCase(authSignUpUser.pending, pending)
      .addCase(authSignInUser.pending, pending)

      .addCase(authSignUpUser.rejected, rejected)
      .addCase(authSignInUser.rejected, rejected),
});

export default authSlice.reducer;
