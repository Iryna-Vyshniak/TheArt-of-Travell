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
const { updateUserProfile, authStateChange, updateUserAvatar, authSignOut } = authSlice.actions;

export const authSignUpUser =
  ({ email, password, name, userAvatar }) =>
  async (dispatch, getState) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;

      await updateProfile(user, { displayName: name, photoURL: userAvatar });

      const { uid, displayName, photoURL } = user;
      //console.log(displayName, uid);

      dispatch(
        updateUserProfile({
          userId: uid,
          name: displayName,
          email,
          avatar: photoURL,
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
        Alert.alert('Email address is not valid and it is required');
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
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      const errorCode = error.code;

      if (errorCode === 'auth/wrong-password') {
        Alert.alert('Password is invalid for the given email');
      }
      if (errorCode === 'auth/user-not-found') {
        Alert.alert('No user corresponding to the given email');
      }
      if (errorCode === 'auth/user-disabled') {
        Alert.alert('User corresponding to the given email has been disabled');
      }
      if (errorCode === 'auth/invalid-email') {
        Alert.alert('Email address is not valid and it`s required');
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
          avatar: user.photoURL,
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

export const changeAvatarUser = (newAvatarURL) => async (dispatch, getState) => {
  // information about the current user
  const user = auth.currentUser;
  // Checks if the user exists: 'Registration' or 'Profile'. If the user variable is not null, then the user already exists.  If 'Registration', then user doesn't exist yet...
  if (user !== null) {
    await updateProfile(user, {
      photoURL: newAvatarURL,
    });
  }
  // dispatches the updateUserAvatar action with an object containing the updated avatar: processedAvatarURL to the Redux store using the dispatch function
  dispatch(updateUserAvatar({ avatar: newAvatarURL }));
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
