import * as ImagePicker from 'expo-image-picker';
import Icon from '@expo/vector-icons/Feather';
import {
  SafeAreaView,
  ImageBackground,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Dimensions,
  Pressable,
  Image,
  Alert,
} from 'react-native';
import { StyleSheet } from 'react-native';
import Bg from '../../../assets/login-bg.jpg';
import { useState, useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { authSignUpUser } from '../../redux/auth/authOperation';
import { uploadPhotoToServer } from '../../shared/uploadPhoto';

const RegistrationScreen = ({ navigation }) => {
  // orientation change
  const [dimensions, setDimensions] = useState({
    windowWidth: Dimensions.get('window').width - 8 * 2,
    windowHeight: Dimensions.get('window').height,
  });

  const [keyboardStatus, setKeyboardStatus] = useState(false);
  const [focused, setFocused] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ photo: '', name: '', email: '', password: '' });

  const { name, email, password, photo } = formData;

  const dispatch = useDispatch();

  // change orientation
  useEffect(() => {
    const onChange = ({ window }) => {
      const windowWidth = window.width - 8 * 2;
      const windowHeight = window.height;
      setDimensions({ windowWidth, windowHeight });
    };

    const subscription = Dimensions.addEventListener('change', onChange);
    return () => subscription?.remove();
  }, []);

  const isPortrait = dimensions.windowWidth < dimensions.windowHeight;

  // show and hide password
  function togglePassword() {
    setShowPassword((prevState) => !prevState);
  }

  // hide keyboard
  const keyboardHide = () => {
    setKeyboardStatus(false);
    Keyboard.dismiss();
  };

  // add avatar
  const handleAddAvatar = async () => {
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
      setFormData((prev) => ({ ...prev, photo: result.assets[0].uri }));
    }
  };

  // remove avatar
  const handleRemoveAvatar = () => {
    setFormData((prev) => ({ ...prev, photo: '' }));
  };

  // check credentials
  const checkCredentials = () => {
    if (!photo || !name || !email || !password) {
      return Alert.alert('', 'Будь ласка, додайте фото та заповніть всі поля форми');
    }
  };

  // submit
  const handleSubmit = async () => {
    checkCredentials();
    keyboardHide();
    setShowPassword(false);
    const imageRef = await uploadPhotoToServer(photo);
    const newUser = {
      userAvatar: imageRef,
      name,
      email,
      password,
    };

    dispatch(authSignUpUser(newUser));
    setFormData({ name: '', email: '', password: '', photo: '' });
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <SafeAreaView style={styles.mainContainer}>
        <ImageBackground source={Bg} resizeMode="cover" style={styles.image}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.keyboard}
          >
            <View
              style={{
                ...styles.container,
                flex: isPortrait ? 0 : 1,
                paddingBottom: keyboardStatus ? 0 : 78,
                paddingTop: isPortrait ? 0 : 30,
              }}
            >
              {/*  <Avatar /> */}
              <View style={styles.box}>
                <Image
                  style={styles.avatar}
                  source={photo ? { uri: photo } : require('../../../assets/avatar.png')}
                />
                <Pressable
                  onPress={photo ? handleRemoveAvatar : handleAddAvatar}
                  accessibilityLabel={photo ? 'Remove Avatar' : 'Add Avatar'}
                  style={{
                    ...styles.btnAdd,
                    borderColor: photo ? '#E8E8E8' : '#FF6C00',
                  }}
                >
                  {photo ? (
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
              <Text
                style={{
                  ...styles.title,
                  marginBottom: isPortrait ? 33 : 8,
                  marginTop: isPortrait ? -32 : -52,
                }}
              >
                Реєстрація
              </Text>
              <View
                style={{
                  ...styles.form,
                  width: dimensions.windowWidth,
                  gap: isPortrait ? 16 : 8,
                }}
              >
                <TextInput
                  value={name}
                  onChangeText={(value) =>
                    setFormData((prevState) => ({ ...prevState, name: value }))
                  }
                  placeholder="Логін"
                  placeholderTextColor="#BDBDBD"
                  autoCapitalize="none"
                  selectionColor={'#FF6C00'}
                  onFocus={() => {
                    setKeyboardStatus(true);
                    setFocused('name');
                  }}
                  onBlur={() => {
                    setFocused('');
                  }}
                  style={{
                    ...styles.input,
                    borderColor: focused === 'name' ? '#FF6C00' : '#E8E8E8',
                  }}
                />
                <TextInput
                  value={email}
                  onChangeText={(value) =>
                    setFormData((prevState) => ({ ...prevState, email: value }))
                  }
                  placeholder="Адреса електронної пошти"
                  placeholderTextColor="#BDBDBD"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  selectionColor={'#FF6C00'}
                  onFocus={() => {
                    setKeyboardStatus(true);
                    setFocused('email');
                  }}
                  onBlur={() => {
                    setFocused('');
                  }}
                  style={{
                    ...styles.input,
                    borderColor: focused === 'email' ? '#FF6C00' : '#E8E8E8',
                  }}
                />
                <View style={{ ...styles.passwordContainer, marginBottom: isPortrait ? 43 : 8 }}>
                  <TextInput
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChangeText={(value) =>
                      setFormData((prevState) => ({ ...prevState, password: value }))
                    }
                    placeholder="Пароль"
                    placeholderTextColor="#BDBDBD"
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    selectionColor={'#FF6C00'}
                    onFocus={() => {
                      setKeyboardStatus(true);
                      setFocused('password');
                    }}
                    onBlur={() => {
                      setFocused('');
                    }}
                    style={{
                      ...styles.input,
                      borderColor: focused === 'password' ? '#FF6C00' : '#E8E8E8',
                    }}
                  />
                  <TouchableOpacity
                    onPress={togglePassword}
                    activeOpacity={0.7}
                    style={styles.passwordIndicator}
                  >
                    <Text style={styles.showText}>{showPassword ? 'Сховати' : 'Показати'}</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={handleSubmit} activeOpacity={0.7} style={styles.btn}>
                  <Text style={styles.BtnText}>Увійти</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Login')}
                  activeOpacity={0.7}
                  style={styles.wrapper}
                >
                  <Text style={styles.loginText}>
                    Вже є акаунт? <Text style={styles.loginLink}>Увійти</Text>
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default RegistrationScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },

  image: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  keyboard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',

    height: '100%',
    width: '100%',
  },

  container: {
    alignItems: 'center',
    paddingBottom: 78,
    width: '100%',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: '#fff',
  },

  box: {
    position: 'relative',
    top: -60,
    alignSelf: 'center',
    width: 120,
    height: 120,
    backgroundColor: '#F6F6F6',
    borderRadius: 16,
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

  avatar: {
    borderRadius: 16,
    backgroundColor: '#F6F6F6',

    width: 120,
    height: 120,
  },

  title: {
    marginTop: -32,

    color: '#212121',

    fontFamily: 'Roboto_500Medium',
    fontSize: 30,
    lineHeight: 35,
    textAlign: 'center',
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    gap: 16,
    width: '100%',
    backgroundColor: 'transparent',
  },

  input: {
    marginHorizontal: 'auto',
    padding: 16,
    paddingBottom: 15,
    width: '100%',
    height: 50,
    backgroundColor: '#F6F6F6',

    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 8,

    fontFamily: 'Roboto_400Regular',
    fontSize: 16,
    lineHeight: 19,
    color: '#212121',
  },

  passwordContainer: {
    position: 'relative',
  },

  passwordIndicator: {
    position: 'absolute',
    top: '50%',
    right: 16,
    transform: [{ translateY: -6 }],
  },

  showText: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 16,
    lineHeight: 19,
    color: '#1B4371',
  },

  btn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    marginHorizontal: 'auto',
    padding: 16,

    height: 51,

    backgroundColor: '#FF6C00',
    borderRadius: 100,
  },

  BtnText: {
    color: '#fff',
    fontFamily: 'Roboto_400Regular',
    fontSize: 16,
    lineHeight: 19,
    textAlign: 'center',
  },

  loginBtn: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 188,
    height: 19,
  },

  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },

  loginText: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 16,
    lineHeight: 19,
    textAlign: 'center',

    color: '#1B4371',
  },

  loginLink: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 16,
    lineHeight: 19,
    textAlign: 'center',
    textDecorationLine: 'underline',

    color: '#1B4371',
  },
});
