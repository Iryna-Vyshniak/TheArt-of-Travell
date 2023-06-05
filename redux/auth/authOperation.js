import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../../firebase/config';
import { authSlice } from './authReducer';

export const authSignUpUser =
  ({ email, password, name }) =>
  async (dispatch, getState) => {
    console.log('FORMDATA ===>', email, password, name);
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      dispatch(authSlice.actions.updateUserProfile({ userId: user.uid }));
      console.log('User: ', user);
    } catch (error) {
      throw error;
    }
  };

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    console.log('FORMDATA ===>', email, password);
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log('USER: ', user);
    } catch (error) {
      throw error;
    }
  };
