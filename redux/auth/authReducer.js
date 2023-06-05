import { createSlice } from '@reduxjs/toolkit';

const state = {
  userId: null,
  name: null,
  email: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: state,
  reducers: {
    updateUserProfile: (state, action) => {
      console.log('ACTION', action);
      console.log('PAYLOAD', action.payload);
      return { ...state, userId: action.payload.userId };
    },
  },
});

console.log(authSlice.actions);
