import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import useRoute from '../router';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { authStateChangeUser } from '../redux/auth/authOperation';

const Main = () => {
  const dispatch = useDispatch();

  const { stateChange } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(authStateChangeUser());
  }, []);

  const routing = useRoute(stateChange);

  return <NavigationContainer>{routing}</NavigationContainer>;
};

export default Main;
