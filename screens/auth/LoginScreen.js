import { useState, useEffect } from 'react';
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
  Platform,
  Dimensions,
} from 'react-native';
import { StyleSheet } from 'react-native';
import Bg from '../../assets/login-bg.jpg';

const LoginScreen = ({ navigation }) => {
  // orientation change
  const [dimensions, setDimensions] = useState({
    windowWidth: Dimensions.get('window').width - 8 * 2,
    windowHeight: Dimensions.get('window').height,
  });

  const [keyboardStatus, setKeyboardStatus] = useState(false);
  const [focused, setFocused] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

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

  const validateEmail = (str) => {
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(str);
  };

  const checkTextInput = () => {
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
    Alert.alert('Credentials', `email: ${formData.email}, password: ${formData.password}`);
    // return navigation.navigate('Home');
  };

  const keyboardHide = () => {
    setKeyboardStatus(false);
    Keyboard.dismiss();
  };

  const handleSubmit = () => {
    checkTextInput();
    keyboardHide();
    setShowPassword(false);
    console.log(formData);
    setFormData({ email: '', password: '' });
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
                paddingBottom: keyboardStatus ? 0 : 111,
              }}
            >
              <Text style={styles.title}>Увійти</Text>
              <View style={styles.form}>
                <TextInput
                  id='email'
                  value={email}
                  onChangeText={(value) =>
                    setFormData((prevState) => ({ ...prevState, email: value }))
                  }
                  placeholder='Адреса електронної пошти'
                  placeholderTextColor='#BDBDBD'
                  keyboardType='email-address'
                  autoCompleteType='email-address'
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
                <View style={styles.passwordContainer}>
                  <TextInput
                    type={showPassword ? 'text' : 'password'}
                    id='password'
                    value={password}
                    onChangeText={(value) =>
                      setFormData((prevState) => ({ ...prevState, password: value }))
                    }
                    placeholder='Пароль'
                    placeholderTextColor='#BDBDBD'
                    secureTextEntry={!showPassword}
                    autoCompleteType='password'
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
                <TouchableOpacity
                  onPress={() => {
                    handleSubmit();
                    navigation.navigate('Home', { screen: 'Posts' });
                  }}
                  style={styles.btn}
                >
                  <Text style={styles.BtnText}>Увійти</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  // title='Go to register'
                  onPress={() => navigation.navigate('Register')}
                  activeOpacity={0.7}
                  style={styles.wrapper}
                >
                  <Text style={styles.loginText}>
                    Немає акаунту? <Text style={styles.loginLink}>Зареєструватися</Text>
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

export default LoginScreen;

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
    paddingBottom: 111,
    width: '100%',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: '#fff',
  },

  title: {
    marginTop: 32,
    marginBottom: 33,

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
    paddingHorizontal: 16,
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
    marginBottom: 43,
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
