// import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import useRoute from '../router';

import { AntDesign, Ionicons } from '@expo/vector-icons';

const Navigation = () => {
  const routing = useRoute({});
  return <NavigationContainer>{routing}</NavigationContainer>;
};

export default Navigation;
