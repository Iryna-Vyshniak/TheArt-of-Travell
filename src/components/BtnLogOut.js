import { Pressable, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const BtnLogOut = () => {
  const navigation = useNavigation();
  // console.log(navigation);

  return (
    <Pressable
      onPress={() => navigation.navigate('Login', { screen: 'Login' })}
      style={styles.logoutBtn}
    >
      <Feather name="log-out" size={24} color="#BDBDBD" />
    </Pressable>
  );
};

export default BtnLogOut;

const styles = StyleSheet.create({
  // logOut
  logoutBtn: {
    position: 'absolute',
    top: 22,
    right: 18,
  },
});
