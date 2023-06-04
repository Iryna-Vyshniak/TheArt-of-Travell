import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  authStateChanged,
  getCurrentUserInfo,
  loginDB,
  registerDB,
  logOut,
} from '../../services/auth';

export const authSignUpUser = createAsyncThunk('auth/signup', async (user, { rejectWithValue }) => {
  try {
    const { name, email, password, image } = user;
    const result = await registerDB({
      email: email,
      password: password,
      displayName: name,
      image,
    });
    return result;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const authSignInUser = createAsyncThunk('auth/signin', async (user, { rejectWithValue }) => {
  try {
    const { email, password } = user;
    const result = await loginDB({ email: email, password: password });
    return result;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const authLogOutUser = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    await logOut();
    return;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const currentUser = createAsyncThunk('auth/currentUser', async (_, { rejectWithValue }) => {
  try {
    const result = await getCurrentUserInfo();
    return result;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const currentState = createAsyncThunk(
  'auth/currentState',
  async (_, { rejectWithValue }) => {
    try {
      const result = await authStateChanged();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
