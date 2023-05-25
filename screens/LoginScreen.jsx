import {
  ImageBackground,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import { styles } from '../styles/LoginScreen.styled';
import Bg from '../assets/login-bg.jpg';
import { useState } from 'react';

const LoginScreen = ({ navigation }) => {
  const [focused, setFocused] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }

  function togglePassword() {
    setShowPassword((prevState) => !prevState);
  }

  return (
    <TouchableWithoutFeedback>
      <View style={styles.mainContainer}>
        <ImageBackground source={Bg} resizeMode='cover' style={styles.image}>
          <KeyboardAvoidingView style={styles.keyboard}>
            <View style={styles.container}>
              <Text style={styles.title}>Увійти</Text>
              <View style={styles.form}>
                <TextInput
                  id='email'
                  value={email}
                  onChange={onChange}
                  placeholder='Адреса електронної пошти'
                  autoCompleteType='email'
                  autoCapitalize='none'
                  selectionColor={'#FF6C00'}
                  onFocus={() => {
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
                    onChange={onChange}
                    placeholder='Пароль'
                    secureTextEntry={showPassword}
                    autoCompleteType='password'
                    autoCapitalize='none'
                    selectionColor={'#FF6C00'}
                    onFocus={() => {
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
                  <TouchableOpacity onPress={togglePassword} style={styles.passwordIndicator}>
                    <Text style={styles.showText}>{showPassword ? 'Показати' : 'Сховати'}</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.btn}>
                  <Text style={styles.BtnText}>Увійти</Text>
                </TouchableOpacity>
                <View style={styles.wrapper}>
                  <Text style={styles.loginText}>Немає акаунту?</Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('RegistrationScreen')}
                    style={styles.loginText}
                  >
                    <Text style={styles.loginLink}>Зареєструватися</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;
