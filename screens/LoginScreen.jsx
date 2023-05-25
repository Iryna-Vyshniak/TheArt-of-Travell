import { ImageBackground, View, Text } from 'react-native';
import { styles } from '../styles/LoginScreen.styled';
import Bg from '../assets/login-bg.jpg';

const LoginScreen = () => {
  return (
    <View style={styles.mainContainer}>
      <ImageBackground source={Bg} resizeMode='cover' style={styles.image}></ImageBackground>
    </View>
  );
};

export default LoginScreen;
