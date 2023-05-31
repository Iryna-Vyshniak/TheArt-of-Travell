import { useEffect, useState } from 'react';
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';

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
} from 'react-native';
import { Feather } from '@expo/vector-icons';

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
  const [hasCameraPermissions, setHasCameraPermissions] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [camera, setCamera] = useState(null);
  const [post, setPost] = useState(initialPost);

  const [keyboardStatus, setKeyboardStatus] = useState(false);
  const [focused, setFocused] = useState('');
  const [disabled, setDisabled] = useState(true);

  const { image, title, position, location } = post;

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermissions(cameraStatus === 'granted');
    })();
  }, []);

  useEffect(() => {
    if (image && title && position) {
      setDisabled(false);
    }
    if (!image && !title && !position) {
      setDisabled(true);
    }
  }, [image, title, position]);

  const keyboardHide = () => {
    setKeyboardStatus(false);
    Keyboard.dismiss();
  };

  const resetForm = () => {
    setPost(initialPost);
  };

  const toggleCameraType = () => {
    setType((current) => (current === CameraType.back ? CameraType.front : CameraType.back));
  };

  const removePhoto = async () => {
    setPost((prevState) => ({ ...prevState, image: null }));
  };

  const takePhoto = async () => {
    if (camera) {
      const { uri } = await camera.takePictureAsync();
      await MediaLibrary.createAssetAsync(uri);
      setPost((prevState) => ({ ...prevState, image: uri }));
    }
    if (hasCameraPermissions === 'null') {
      return <View />;
    }

    if (hasCameraPermissions === 'false') {
      return <Text>No access to camera</Text>;
    }
  };

  const sendPhoto = () => {
    console.log('navigation:', navigation);
    console.log(image);

    navigation.navigate('MainPosts', {
      image,
    });
  };

  const handlePublishedPost = () => {
    keyboardHide();
    resetForm();
    //setDisabled(true);
  };

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
            <Camera
              style={styles.addImageContainer}
              ref={(ref) => setCamera(ref)}
              type={type}
              ratio={'1:1'}
            >
              {image ? (
                <Image
                  source={{ uri: image }}
                  style={styles.photo}
                  // style={{ ...styles.photo, height: 240, width: 343 }}
                />
              ) : null}
              <TouchableOpacity
                style={{ position: 'absolute', top: 0, right: 0, flex: 0.1, alignSelf: 'flex-end' }}
                onPress={toggleCameraType}
              >
                <Text style={{ color: '#fff' }}>Flip Camera</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={takePhoto}
                accessibilityLabel={image ? 'Change picture' : 'Add picture'}
                style={{
                  ...styles.addImageBtn,
                  backgroundColor: image ? 'rgba(255, 255, 255, 0.3)' : '#ffffff',
                }}
              >
                {image ? (
                  <Feather name='camera' size={24} color='#FFFFFF' />
                ) : (
                  <Feather name='camera' size={24} color='#BDBDBD' />
                )}
              </TouchableOpacity>
            </Camera>
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

          <TouchableOpacity
            onPress={sendPhoto}
            //disabled={disabled}
            style={styles.formBtn}
            // style={{ ...styles.formBtn, backgroundColor: disabled ? '#F6F6F6' : '#FF6C00' }}
          >
            <Text
              style={disabled ? { ...styles.formBtnText, color: '#BDBDBD' } : styles.formBtnText}
            >
              Опубліковати
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteBtn} onPress={resetForm}>
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
    marginTop: 120,
    width: 70,
    height: 40,
    backgroundColor: '#F6F6F6',
    borderRadius: 20,
  },
});

// <Feather name="arrow-up" size={24} color="#FFFFFF" />
