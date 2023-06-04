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
  Alert,
  Pressable,
  Image,
  Platform,
  Dimensions,
} from 'react-native';
import { StyleSheet } from 'react-native';
import Bg from '../../assets/login-bg.jpg';
import { useState, useEffect } from 'react';
import Icon from '@expo/vector-icons/Feather';

import { useDispatch } from 'react-redux';
import { authSignUpUser } from '../../redux/auth/authOperation';

const RegistrationScreen = ({ navigation }) => {
  //console.log(navigation);
  // orientation change
  const [dimensions, setDimensions] = useState({
    windowWidth: Dimensions.get('window').width - 8 * 2,
    windowHeight: Dimensions.get('window').height,
  });

  const [keyboardStatus, setKeyboardStatus] = useState(false);
  const [focused, setFocused] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [userAvatar, setUserAvatar] = useState('');
  const [formData, setFormData] = useState({ photo: '', name: '', email: '', password: '' });

  const { name, email, password } = formData;

  const dispatch = useDispatch();

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

  function togglePassword() {
    setShowPassword((prevState) => !prevState);
  }

  const validateLogin = (str) => {
    const loginRegex = /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;
    return loginRegex.test(str);
  };

  const validateEmail = (str) => {
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(str);
  };

  const checkTextInput = () => {
    if (!name.trim()) {
      Alert.alert('Warning', 'Login is required. Please write your login');
      return;
    }

    if (!validateLogin(name)) {
      Alert.alert(
        'Warning',
        'Please write valid login. Login may contain only letters, apostrophe, dash and spaces'
      );
      return;
    }

    if (!email.trim()) {
      Alert.alert('Warning', 'Email is required. Please write your email');
      return;
    }
    if (!validateEmail(email)) {
      Alert.alert('Warning', 'Please write valid email');
      return;
    }
    if (!password.trim()) {
      Alert.alert('Warning', 'Password is required. Please write password');
      return;
    }
    Alert.alert(
      'Credentials',
      `name: ${formData.name}, email: ${formData.email}, password: ${formData.password}`
    );
    return navigation.navigate('Home', { screen: 'Home' });
  };

  const handleAddAvatar = () => {
    setUserAvatar(require('../../assets/avatar.png'));
  };

  const handleRemoveAvatar = () => {
    setUserAvatar(null);
  };

  const keyboardHide = () => {
    setKeyboardStatus(false);
    Keyboard.dismiss();
  };

  const handleSubmit = () => {
    checkTextInput();
    keyboardHide();
    setShowPassword(false);

    dispatch(authSignUpUser(formData));

    setFormData({ name: '', email: '', password: '' });
    //navigation.navigate('Home', { screen: 'Posts' });
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <SafeAreaView style={styles.mainContainer}>
        <ImageBackground source={Bg} resizeMode='cover' style={styles.image}>
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
                // height: dimensions.windowHeight * (isPortrait ? 0.61 : 1),
                // maxHeight: isPortrait ? dimensions.windowHeight * 0.61 : '100%',
              }}
            >
              <View style={styles.box}>
                {userAvatar ? (
                  <Image source={require('../../assets/avatar.png')} resizeMode='cover' />
                ) : null}
                <Pressable
                  onPress={userAvatar ? handleRemoveAvatar : handleAddAvatar}
                  accessibilityLabel={userAvatar ? 'Remove Avatar' : 'Add Avatar'}
                  style={{
                    ...styles.btnAdd,
                    borderColor: userAvatar ? '#E8E8E8' : '#FF6C00',
                  }}
                >
                  {userAvatar ? (
                    <Icon
                      name='plus'
                      size={20}
                      color='#E8E8E8'
                      style={{ transform: [{ rotate: '-45deg' }] }}
                    />
                  ) : (
                    <Icon name='plus' size={20} color='#FF6C00' />
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
                style={{ ...styles.form, width: dimensions.windowWidth, gap: isPortrait ? 16 : 8 }}
              >
                <TextInput
                  id='name'
                  value={name}
                  onChangeText={(value) =>
                    setFormData((prevState) => ({ ...prevState, name: value.trim() }))
                  }
                  placeholder='Логін'
                  placeholderTextColor='#BDBDBD'
                  autoCapitalize='none'
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
                  id='email'
                  value={email}
                  onChangeText={(value) =>
                    setFormData((prevState) => ({ ...prevState, email: value.trim() }))
                  }
                  placeholder='Адреса електронної пошти'
                  placeholderTextColor='#BDBDBD'
                  keyboardType='email-address'
                  autoCapitalize='none'
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
                    id='password'
                    value={password}
                    onChangeText={(value) =>
                      setFormData((prevState) => ({ ...prevState, password: value.trim() }))
                    }
                    placeholder='Пароль'
                    placeholderTextColor='#BDBDBD'
                    secureTextEntry={!showPassword}
                    autoCapitalize='none'
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
                  // title='Go to login'
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

  title: {
    marginTop: -32,
    //marginBottom: 33,

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
    backgroundColor: 'transparent',
    //paddingHorizontal: 16,
    width: '100%',
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
    //marginBottom: 43,
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
