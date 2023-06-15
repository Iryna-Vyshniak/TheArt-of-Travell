import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useContext } from 'react';
import { authStateChangeUser } from '../redux/auth/authOperation';
// dark mode theme
import { EventRegister } from 'react-native-event-listeners';
import { ThemeContext } from '../shared/theme/ThemeContext';
import { createStackNavigator } from '@react-navigation/stack';
// screens
import LoginScreen from '../screens/auth/LoginScreen';
import RegistrationScreen from '../screens/auth/RegistrationScreen';
import Home from '../screens/mainScreen/Home';
import CommentsScreen from '../screens/nestedScreens/CommentsScreen';
import MapScreen from '../screens/nestedScreens/MapScreen';

import { CustomBackButton } from './CustomBackButton';
import SettingScreen from '../screens/nestedScreens/SettingScreen';

const Stack = createStackNavigator();

const MainNavigation = () => {
  const { darkMode, setDarkMode, theme } = useContext(ThemeContext);

  const dispatch = useDispatch();
  const { stateChange } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(authStateChangeUser());
  }, []);

  useEffect(() => {
    const listener = (data) => {
      setDarkMode(data);
    };
    const subscription = EventRegister.addEventListener('ChangeTheme', listener);

    return () => {
      EventRegister.removeEventListener('ChangeTheme', subscription);
    };
  }, [darkMode]);

  const styles = {
    container: {
      flex: 1,
      backgroundColor: theme.background,
      alignItems: 'center',
      justifyContent: 'center',
    },
    headerBox: {
      height: 73,
      backgroundColor: theme.background,
      boxShadow: '0px -0.5px 0px rgba(0, 0, 0, 0.3)',
      borderBottomWidth: 1,
      borderBottomColor: '#BDBDBD',
    },
    headerBoxSettings: {
      height: 73,
      backgroundColor: theme.settingsBg,
      boxShadow: '0px -0.5px 0px rgba(0, 0, 0, 0.3)',
      borderBottomWidth: 1,
      borderBottomColor: '#BDBDBD',
    },
    headerTitle: {
      color: theme.color,
      fontFamily: 'Roboto_500Medium',
      fontSize: 17,
      letterSpacing: -0.408,
    },
    tabBar: {
      display: 'flex',
      height: 83,
      paddingTop: 9,
      paddingBottom: 20,
      height: 70,
      backgroundColor: theme.background,
      boxShadow: '0px -0.5px 0px rgba(0, 0, 0, 0.3)',
    },
    tabBarItem: {
      textAlign: 'center',
      padding: 8,
      backgroundColor: '#FF6C00',
      width: 70,
      height: 40,
      borderRadius: 20,
    },
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" options={{ headerShown: false }}>
        {!stateChange ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen
              name="Register"
              component={RegistrationScreen}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Stack.Screen
              name="Setting"
              component={SettingScreen}
              options={({ navigation }) => ({
                title: 'Налаштування',
                headerTitleAlign: 'center',
                headerStyle: styles.headerBoxSettings,
                headerRightContainerStyle: { paddingRight: 16 },
                headerLeftContainerStyle: { paddingLeft: 16 },
                headerTitleStyle: styles.headerTitle,
                headerTitleAlign: 'center',
                headerLeft: () => <CustomBackButton onPress={() => navigation.goBack()} />,
                tabBarVisible: false,
              })}
            />
            <Stack.Screen
              name="Comments"
              component={CommentsScreen}
              options={({ navigation }) => ({
                title: 'Коментарі',
                headerTitleAlign: 'center',
                headerStyle: styles.headerBox,
                headerRightContainerStyle: { paddingRight: 16 },
                headerLeftContainerStyle: { paddingLeft: 16 },
                headerTitleStyle: styles.headerTitle,
                headerTitleAlign: 'center',
                headerLeft: () => <CustomBackButton onPress={() => navigation.goBack()} />,
                tabBarVisible: false,
              })}
            />
            <Stack.Screen
              name="Map"
              component={MapScreen}
              options={({ navigation }) => ({
                title: 'Maпа',
                headerTitleAlign: 'center',
                headerStyle: styles.headerBox,
                headerRightContainerStyle: { paddingRight: 16 },
                headerLeftContainerStyle: { paddingLeft: 16 },
                headerTitleStyle: styles.headerTitle,
                headerTitleAlign: 'center',
                headerLeft: () => <CustomBackButton onPress={() => navigation.goBack()} />,
                tabBarVisible: false,
              })}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
