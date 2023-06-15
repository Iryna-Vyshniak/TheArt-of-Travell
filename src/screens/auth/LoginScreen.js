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
  ActivityIndicator,
} from 'react-native';
import { useDispatch } from 'react-redux';

import { StyleSheet } from 'react-native';
import Bg from '../../../assets/login-bg.jpg';
import { authSignInUser } from '../../redux/auth/authOperation';

const LoginScreen = ({ navigation }) => {
  // orientation change
  const [dimensions, setDimensions] = useState({
    windowWidth: Dimensions.get('window').width - 8 * 2,
    windowHeight: Dimensions.get('window').height,
  });

  const [keyboardStatus, setKeyboardStatus] = useState(false);
  const [focused, setFocused] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

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

  // hide and show password
  function togglePassword() {
    setShowPassword((prevState) => !prevState);
  }

  // check validate password
  const checkTextInput = () => {
    if (!password) {
      return Alert.alert('Warning', 'Password is required. Please write password');
    }
  };

  // hide keyboard
  const keyboardHide = () => {
    setKeyboardStatus(false);
    Keyboard.dismiss();
  };

  // submit
  const handleSubmit = async () => {
    setSubmitting(true);
    keyboardHide();
    setShowPassword(false);

    try {
      await dispatch(authSignInUser(formData));
      setFormData({ email: '', password: '' });
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
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
                paddingBottom: keyboardStatus ? 0 : 111,
              }}
            >
              <Text style={styles.title}>Увійти</Text>
              {!submitting ? (
                <View style={styles.form}>
                  <TextInput
                    value={email}
                    onChangeText={(value) =>
                      setFormData((prevState) => ({ ...prevState, email: value }))
                    }
                    placeholder="Адреса електронної пошти"
                    placeholderTextColor="#BDBDBD"
                    keyboardType="email-address"
                    autoCompleteType="email-address"
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
                  <View style={styles.passwordContainer}>
                    <TextInput
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChangeText={(value) =>
                        setFormData((prevState) => ({ ...prevState, password: value }))
                      }
                      placeholder="Пароль"
                      placeholderTextColor="#BDBDBD"
                      secureTextEntry={!showPassword}
                      autoCompleteType="password"
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
                  <TouchableOpacity onPress={handleSubmit} style={styles.btn}>
                    <Text style={styles.BtnText}>Увійти</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Register')}
                    activeOpacity={0.7}
                    style={styles.wrapper}
                  >
                    <Text style={styles.loginText}>
                      Немає акаунту? <Text style={styles.loginLink}>Зареєструватися</Text>
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    gap: 16,
                    paddingHorizontal: 16,
                    width: '100%',
                    backgroundColor: 'transparent',
                  }}
                >
                  <ActivityIndicator size="large" color="#FF6C00" style={{ marginBottom: 350 }} />
                </View>
              )}
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
