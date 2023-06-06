import { useEffect, useState } from 'react';
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as Location from 'expo-location';
import { db, storage } from '../../firebase/config';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';
import { useSelector } from 'react-redux';

import { Feather } from '@expo/vector-icons';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Platform,
  Pressable,
  Vibration,
} from 'react-native';

const initialPost = {
  image: null,
  title: '',
  position: '',
  location: {
    latitude: '',
    longitude: '',
  },
};

const CreatePostsScreen = ({ navigation }) => {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [type, setType] = useState(CameraType.back);
  const [camera, setCamera] = useState(null);
  const [post, setPost] = useState(initialPost);

  const [keyboardStatus, setKeyboardStatus] = useState(false);
  const [focused, setFocused] = useState('');
  const [disabled, setDisabled] = useState(true);

  const { image, title, position } = post;
  const { userId, name } = useSelector((state) => state.auth);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();
      requestPermission(cameraStatus === 'granted');
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }
    })();
  }, []);

  //console.log('cameraStatus', permission);

  useEffect(() => {
    if (image && title && position) {
      setDisabled(false);
    }
    if (!image && !title && !position) {
      setDisabled(true);
    }
  }, [image, title, position]);

  // get location
  const getLocation = async () => {
    let {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({});
    setPost((prevState) => ({ ...prevState, location: { latitude, longitude } }));
  };

  // take photo
  const takePhoto = async () => {
    if (camera) {
      const { uri } = await camera.takePictureAsync();
      await MediaLibrary.createAssetAsync(uri);
      Vibration.vibrate();
      getLocation();
      setPost((prevState) => ({ ...prevState, image: uri }));
    }
  };

  // upload photo to server
  // 'file' comes from the Blob
  const uploadPhotoToServer = async () => {
    const response = await fetch(image);
    const file = await response.blob();

    const uniqueImageId = Date.now().toString();
    const path = `images/${uniqueImageId}.jpeg`;

    const storageRef = ref(storage, path);

    const metadata = {
      contentType: 'image/jpeg',
    };

    await uploadBytes(storageRef, file, metadata);

    const downloadPhoto = await getDownloadURL(storageRef);
    console.log('downloadPhoto:', downloadPhoto);
    return downloadPhoto;
  };

  // upload post to server
  const uploadPostToServer = async () => {
    const photo = await uploadPhotoToServer();

    // Cloud Firestore stores data in Documents, which are stored in Collections
    const newPost = {
      photo,
      title,
      location: post.location,
      comments: [],
      likes: [],
      userId,
      name,
    };

    try {
      await addDoc(collection(db, 'posts'), newPost);
      console.log('Post is loaded. Well Done', newPost);
    } catch (error) {
      console.error('Error while adding doc: ', error.message);
    }
  };

  const keyboardHide = () => {
    setKeyboardStatus(false);
    Keyboard.dismiss();
  };

  const toggleCameraType = () => {
    setType((current) => (current === CameraType.back ? CameraType.front : CameraType.back));
  };

  const resetFormPost = () => {
    setPost(initialPost);
  };

  const handlePublishedPost = () => {
    // uploadPhotoToServer();
    uploadPostToServer();
    console.log(post.title, post.location);
    navigation.navigate('PostsDefault', { ...post });
    keyboardHide();
    resetFormPost();
    setDisabled(true);
  };

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return <Text>No access to camera</Text>;
  }

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
          <View
            style={{
              ...styles.addImage,
              paddingBottom: keyboardStatus && Platform.OS == 'android' ? 0 : 12,
            }}
          >
            {image ? (
              <View style={styles.addImageContainer}>
                <Image source={{ uri: image }} style={styles.image} />
                <Pressable
                  onPress={takePhoto}
                  accessibilityLabel={'Change picture'}
                  style={{
                    ...styles.addImageBtn,
                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                  }}
                >
                  <Feather name='camera' size={24} color={'#FFFFFF'} />
                </Pressable>
              </View>
            ) : (
              <Camera
                style={styles.addImageContainer}
                ref={(ref) => {
                  setCamera(ref);
                }}
                type={type}
                ratio='1:1'
              >
                <Pressable
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    flex: 0.1,
                    alignSelf: 'flex-end',
                  }}
                  onPress={toggleCameraType}
                >
                  <Text style={{ color: '#fff' }}>Flip Camera</Text>
                </Pressable>
                <Pressable
                  onPress={takePhoto}
                  accessibilityLabel={'Add picture'}
                  style={{
                    ...styles.addImageBtn,
                    backgroundColor: '#ffffff',
                  }}
                >
                  <Feather name='camera' size={24} color={'#BDBDBD'} />
                </Pressable>
              </Camera>
            )}
            {image ? (
              <Text style={styles.imageCapture}>Редагувати фото</Text>
            ) : (
              <Text style={styles.imageCapture}>Завантажте фото</Text>
            )}
          </View>

          <View style={{ ...styles.inputWrapper, marginBottom: 16 }}>
            <TextInput
              id='title'
              value={title}
              placeholder='Назва...'
              placeholderTextColor='#BDBDBD'
              selectionColor={'#FF6C00'}
              onFocus={() => {
                setKeyboardStatus(true);
                setFocused('title');
              }}
              onBlur={() => {
                setFocused('');
              }}
              onChangeText={(value) => setPost((prevState) => ({ ...prevState, title: value }))}
              style={{
                ...styles.input,
                borderBottomColor: focused === 'title' ? '#FF6C00' : '#E8E8E8',
              }}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Feather name='map-pin' size={24} color='#BDBDBD' />
            <TextInput
              id='position'
              value={position}
              placeholder='Місцевість...'
              placeholderTextColor='#BDBDBD'
              selectionColor={'#FF6C00'}
              onFocus={() => {
                setKeyboardStatus(true);
                setFocused('position');
              }}
              onBlur={() => {
                setFocused('');
              }}
              onChangeText={(value) => setPost((prevState) => ({ ...prevState, position: value }))}
              style={{
                ...styles.input,
                borderBottomColor: focused === 'position' ? '#FF6C00' : '#E8E8E8',
              }}
            />
          </View>
          <View style={styles.btnWrapper}>
            <TouchableOpacity
              onPress={handlePublishedPost}
              //disabled={disabled}
              style={{ ...styles.formBtn, backgroundColor: disabled ? '#F6F6F6' : '#FF6C00' }}
            >
              <Text
                style={disabled ? { ...styles.formBtnText, color: '#BDBDBD' } : styles.formBtnText}
              >
                Опубліковати
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.deleteBtn} onPress={resetFormPost}>
            <Feather name='trash-2' size={24} color='#BDBDBD' />
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default CreatePostsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
  },

  keyboard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',

    height: '100%',
    width: '100%',
  },

  // camera
  addImage: {
    position: 'relative',
    marginTop: 32,
    alignItems: 'center',
  },
  addImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 240,
    backgroundColor: '#F6F6F6',
    borderColor: '#E8E8E8',
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
  },
  photo: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    resizeMode: 'contain',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 240,
    borderRadius: 8,
    resizeMode: 'contain',
    overflow: 'hidden',
  },
  addImageBtn: {
    position: 'absolute',
    //transform: [{ translateX: 155 }, { translateY: 90 }],
    padding: 18,
    borderRadius: 50,
  },
  imageCapture: {
    marginTop: 8,
    marginBottom: 32,
    alignSelf: 'flex-start',
    color: '#BDBDBD',
    fontFamily: 'Roboto_400Regular',
    fontSize: 16,
    lineHeight: 19,
    textAlign: 'left',
  },
  // input
  inputWrapper: {
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: 'transparent',
    borderBottomColor: '#E8E8E8',
    backgroundColor: 'transparent',
  },

  input: {
    textAlign: 'left',
    width: '100%',
    color: '#212121',
    fontFamily: 'Roboto_400Regular',
    fontSize: 16,
    lineHeight: 19,
  },
  // button
  btnWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formBtn: {
    marginHorizontal: 'auto',
    padding: 16,
    borderRadius: 100,
    marginTop: 32,
    width: 343,
    backgroundColor: '#F6F6F6',
  },

  formBtnText: {
    color: '#FFFFFF',
    fontFamily: 'Roboto_400Regular',
    fontSize: 16,
    lineHeight: 19,
    textAlign: 'center',
  },
  // trash
  deleteBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 110,
    width: 70,
    height: 40,
    backgroundColor: '#F6F6F6',
    borderRadius: 20,
  },
});

// <Feather name="arrow-up" size={24} color="#FFFFFF" />
