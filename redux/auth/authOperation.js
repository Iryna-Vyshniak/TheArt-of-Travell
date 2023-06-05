import { Alert } from 'react-native';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../../firebase/config';
import { authSlice } from './authReducer';
const { updateUserProfile, authStateChange, authLogOut } = authSlice.actions;

export const authSignUpUser =
  ({ email, password, name }) =>
  async (dispatch, getState) => {
    console.log('FORMDATA ===>', email, password, name);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;

      await updateProfile(user, { displayName: name });

      const { uid, displayName } = user;
      console.log(displayName, uid);

      dispatch(
        updateUserProfile({
          userId: uid,
          name: displayName,
          email,
        })
      );
    } catch (error) {
      Alert.alert(error.message);
      throw error;
    }
  };

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    console.log('credential: ', email, password);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const { uid, displayName } = user;
      console.log(displayName, uid);

      dispatch(
        updateUserProfile({
          userId: uid,
          name: displayName,
          //email: email,
        })
      );
    } catch (error) {
      Alert.alert("Error! Email or password doesn't match");
      throw error;
    }
  };

export const authStateChangeUser = () => async (dispatch, getState) => {
  console.log('FORMDATA ===>', email, password);
  try {
    const user = await signInWithEmailAndPassword(auth, email, password);
    console.log('USER: ', user);
  } catch (error) {
    Alert.alert(error.message);
    throw error;
  }
};
