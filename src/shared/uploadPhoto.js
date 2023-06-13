import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../firebase/config';

// upload photo to server
// 'file' comes from the Blob
export const uploadPhotoToServer = async (avatar) => {
  const response = await fetch(avatar);
  const file = await response.blob();

  const uniqueImageId = Date.now().toString();
  const path = `avatars/${uniqueImageId}.jpeg`;

  const storageRef = ref(storage, path);

  const metadata = {
    contentType: 'image/jpeg',
  };

  await uploadBytes(storageRef, file, metadata);

  const downloadPhoto = await getDownloadURL(storageRef);

  return downloadPhoto;
};
