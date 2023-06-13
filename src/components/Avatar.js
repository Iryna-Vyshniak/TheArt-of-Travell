import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';
import { View, Pressable, StyleSheet, Image } from 'react-native';
import { storage } from '../firebase/config';
import { useDispatch, useSelector } from 'react-redux';
import { changeAvatarUser } from '../redux/auth/authOperation';
import Icon from '@expo/vector-icons/Feather';
import { useState } from 'react';
import { uploadPhotoToServer } from '../shared/uploadPhoto';

export const Avatar = () => {
  const { userAvatar } = useSelector((state) => state.auth);
  const [avatar, setAvatar] = useState(userAvatar);

  const dispatch = useDispatch();

  const avatarAddHandler = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Ви відмовилися дозволити цій програмі доступ до ваших фотографій');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);

      const avatarURL = await uploadPhotoToServer(result.assets[0].uri);
      dispatch(changeAvatarUser(avatarURL));
    }
  };

  const avatarDeleteHandler = () => {
    setAvatar(null);
    dispatch(changeAvatarUser(null));
  };

  return (
    <View style={styles.avatarContainer}>
      <Image
        style={styles.avatar}
        source={avatar ? { uri: avatar } : require('../../assets/avatar.png')}
      />

      <Pressable
        onPress={avatar ? avatarDeleteHandler : avatarAddHandler}
        accessibilityLabel={userAvatar ? 'Remove Avatar' : 'Add Avatar'}
        style={{
          ...styles.btnAdd,
          borderColor: avatar ? '#E8E8E8' : '#FF6C00',
        }}
      >
        {avatar ? (
          <Icon
            name="plus"
            size={20}
            color="#E8E8E8"
            style={{ transform: [{ rotate: '-45deg' }] }}
          />
        ) : (
          <Icon name="plus" size={20} color="#FF6C00" />
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    position: 'relative',
    top: -60,
    alignSelf: 'center',
    width: 120,
    height: 120,
    backgroundColor: '#F6F6F6',
    borderRadius: 16,
  },
  avatar: {
    borderRadius: 16,
    backgroundColor: '#F6F6F6',

    width: 120,
    height: 120,
  },
  btnAdd: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 12,
    right: -12.5,
    width: 25,
    height: 25,
    borderRadius: 50,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderStyle: 'solid',
  },
});
