import { useDispatch } from 'react-redux';
import { useContext } from 'react';
import { EventRegister } from 'react-native-event-listeners';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Pressable, Text, Switch, TouchableOpacity } from 'react-native';
// icons import
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
// screens
import ProfileScreen from './ProfileScreen';
import CreatePostsScreen from './CreatePostsScreen';
import PostsScreen from '../nestedScreens/PostsScreen';

import { authSignOutUser } from '../../redux/auth/authOperation';
import { ThemeContext } from '../../shared/theme/ThemeContext';
import { CustomBackButton } from '../../components/CustomBackButton';

import { Ionicons } from '@expo/vector-icons';

const MainTab = createBottomTabNavigator();

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const { darkMode, setDarkMode, theme } = useContext(ThemeContext);

  const signOut = () => {
    dispatch(authSignOutUser());
  };

  const styles = {
    container: {
      flex: 1,
      backgroundColor: theme.background,
      alignItems: 'center',
      justifyContent: 'center',
    },
    headerBox: {
      height: 73,
      backgroundColor: theme.tab,
      shadowColor: theme.shadow,
      shadowOpacity: 0.3,
      shadowOffset: { width: 0, height: -0.5 },
      shadowRadius: 0,
      borderBottomWidth: 0.5,
      borderBottomColor: theme.shadow,
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
      backgroundColor: theme.tab,
      shadowColor: theme.shadow,
      shadowOpacity: 0.3,
      shadowOffset: { width: 0, height: -0.5 },
      shadowRadius: 0,
      borderBottomWidth: 0.5,
      borderTopColor: theme.shadow,
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

  // settings
  const navToSetting = () => {
    navigation.navigate('Setting');
  };

  return (
    <MainTab.Navigator
      initialRouteName="Posts"
      screenOptions={{
        // header
        headerStyle: styles.headerBox,
        headerRightContainerStyle: { paddingRight: 16 },
        headerLeftContainerStyle: { paddingLeft: 16 },
        headerTitleStyle: styles.headerTitle,
        headerTitleAlign: 'center',
        // tabs
        tabBarActiveTintColor: '#FF6C00',
        tabBarInactiveTintColor: theme.color,
        tabBarStyle: styles.tabBar,
        tabBarItem: styles.tabBarItem,
        tabBarIconStyle: { strokeWidth: 1 },
        tabBarShowLabel: false,
      }}
    >
      <MainTab.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          title: 'Публікації',
          headerTitleAlign: 'center',
          headerRight: () => (
            <Pressable style={styles.logoutBtn} onPress={signOut}>
              <Feather name="log-out" size={24} color="#BDBDBD" />
            </Pressable>
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={navToSetting}>
              <Ionicons name="settings-sharp" size={20} color={theme.color} />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ focused, color }) => (
            <Feather name="grid" size={24} color={color} focused={focused} />
          ),
        }}
      />
      <MainTab.Screen
        name="CreatePosts"
        component={CreatePostsScreen}
        options={({ navigation }) => ({
          title: 'Створити публікацію',
          headerTitleAlign: 'center',
          headerLeft: () => (
            <CustomBackButton onPress={() => navigation.navigate('Posts', { screen: 'Posts' })} />
          ),
          tabBarStyle: {
            display: 'none',
          },
          tabBarIcon: ({ focused }) => (
            <Text style={styles.tabBarItem}>
              <AntDesign name="plus" size={24} color="#FFFFFF" focused={focused} />
            </Text>
          ),
        })}
      />

      <MainTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <Feather name="user" size={24} color={color} focused={focused} />
          ),
        }}
      />
    </MainTab.Navigator>
  );
};

export default Home;

const styles = StyleSheet.create({
  tabBarItem: {
    textAlign: 'center',
    padding: 8,
    backgroundColor: '#FF6C00',
    width: 70,
    height: 40,
    borderRadius: 20,
  },
});
