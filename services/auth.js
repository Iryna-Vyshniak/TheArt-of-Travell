import { auth, storage } from '../firebase/config';

export const registerDB = async ({ displayName, image, email, password }) => {
  try {
    const user = await auth.createUserWithEmailAndPassword(email, password);

    const uploadImage = async (uri, user) => {
      let URL;
      try {
        const response = await fetch(uri);
        const blob = await response.blob();
        const storageRef = storage.ref();
        const upload = storageRef.child(`usersAvatar/${user.uid}/${'avatar_' + user.uid}`);
        await upload.put(blob);
        await upload.getDownloadURL().then((url) => {
          URL = url;
        });
        return URL;
      } catch (error) {
        throw error;
      }
    };

    const url = await uploadImage(image, user.user.multiFactor.user);

    const updatedUser = await getCurrentUserInfo(displayName, url);
    return updatedUser;
  } catch (error) {
    throw error;
  }
};

export const loginDB = async ({ email, password }) => {
  try {
    const user = await auth.signInWithEmailAndPassword(email, password);
    return user.user;
  } catch (error) {
    throw error;
  }
};

export const getCurrentUserInfo = async (displayName, url) => {
  const user = await auth.currentUser;

  if (user) {
    await user.updateProfile({
      displayName: displayName,
      photoURL: url,
    });

    const newUser = {
      uid: user.uid,
      photo: user.photoURL,
      email: user.email,
      displayName: user.displayName,
    };
    return newUser;
  }
  return;
};

export const authStateChanged = async () => {
  let currentUser = {
    uid: '',
    photo: '',
    email: '',
    displayName: '',
  };
  let loggedIn = false;
  try {
    await auth.onAuthStateChanged((user) => {
      if (user) {
        currentUser = {
          uid: user.uid,
          photo: user.photoURL,
          email: user.email,
          displayName: user.displayName,
        };
        loggedIn = true;
      }
    });
    return { currentUser, loggedIn };
  } catch (error) {
    throw error;
  }
};

export const logOut = () => async () => {
  try {
    await auth.signOut();
  } catch (error) {
    throw error;
  }
};
