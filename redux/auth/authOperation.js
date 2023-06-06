import { Alert } from 'react-native';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from 'firebase/auth';
import { auth } from '../../firebase/config';
import { authSlice } from './authReducer';
const { updateUserProfile, authStateChange, authSignOut } = authSlice.actions;

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
      const errorCode = error.code;

      if (errorCode == 'auth/weak-password') {
        Alert.alert('The password is too weak');
      }
      if (errorCode == 'auth/email-already-in-use') {
        Alert.alert('Already exists an account with the given email address');
      }
      if (errorCode == 'auth/invalid-email') {
        Alert.alert('Email address is not valid');
      } else {
        throw error;
      }
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
          email,
        })
      );
    } catch (error) {
      const errorCode = error.code;

      if (errorCode === 'auth/wrong-password') {
        Alert.alert(
          'Password is invalid for the given email, or the account corresponding to the email does not have a password set'
        );
      }
      if (errorCode === 'auth/user-not-found') {
        Alert.alert('No user corresponding to the given email');
      }
      if (errorCode === 'auth/user-disabled') {
        Alert.alert('User corresponding to the given email has been disabled');
      }
      if (errorCode === 'auth/invalid-email') {
        Alert.alert('Email address is not valid');
      } else {
        throw error;
      }
    }
  };

export const authStateChangeUser = () => async (dispatch) => {
  await onAuthStateChanged(auth, (user) => {
    try {
      if (user) {
        const userUpdateProfile = {
          userId: user.uid,
          name: user.displayName,
          email: user.email,
        };

        dispatch(authStateChange({ stateChange: true }));
        dispatch(updateUserProfile(userUpdateProfile));
      }
    } catch (error) {
      signOut(auth);
      dispatch(authSignOut());
      throw error;
    }
  });
};

export const authSignOutUser = () => async (dispatch, getState) => {
  try {
    await signOut(auth);
    dispatch(authSignOut());
  } catch (error) {
    Alert.alert(error.message);
    throw error;
  }
};
