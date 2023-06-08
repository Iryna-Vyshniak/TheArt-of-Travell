import { createSlice } from '@reduxjs/toolkit';

const state = {
  userId: null,
  name: null,
  email: null,
  stateChange: false,
  userAvatar: null,
};

const actions = {
  updateUserProfile: (state, { payload }) => ({
    ...state,
    userId: payload.userId,
    name: payload.name,
    email: payload.email,
    userAvatar: payload.avatar,
  }),
  updateUserAvatar: (state, { payload }) => ({
    ...state,
    userAvatar: payload.avatar,
  }),
  authStateChange: (state, { payload }) => ({ ...state, stateChange: payload.stateChange }),
  authSignOut: () => state,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: state,
  reducers: actions,
});
