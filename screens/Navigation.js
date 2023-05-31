import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
//import useRoute from '../router';
import useRoute from '../routerAsDesign';

const Navigation = () => {
  const routing = useRoute(null);

  return <NavigationContainer>{routing}</NavigationContainer>;
};

export default Navigation;
