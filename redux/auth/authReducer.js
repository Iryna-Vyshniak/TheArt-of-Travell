import { createSlice } from '@reduxjs/toolkit';

const state = {
  userId: null,
  name: null,
  email: null,
  stateChange: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: state,
  reducers: {
    updateUserProfile: (state, { payload }) => ({
      ...state,
      userId: payload.userId,
      name: payload.name,
      email: payload.email,
    }),
    updateStateChange: (state, { payload }) => ({ ...state, stateChange: payload.stateChange }),
  },
});

console.log(authSlice.actions);
