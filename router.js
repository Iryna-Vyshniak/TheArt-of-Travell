import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Pressable, Text, Alert } from 'react-native';
import { HeaderBackButton } from '@react-navigation/elements';

// icons import
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import LoginScreen from './screens/auth/LoginScreen';
import RegistrationScreen from './screens/auth/RegistrationScreen';
import DefaultPostsScreen from './screens/nestedScreens/DefaultPostsScreen';
import CreatePostsScreen from './screens/mainScreen/CreatePostsScreen';
import ProfileScreen from './screens/mainScreen/ProfileScreen';
import Home from './screens/mainScreen/Home';
import PostsScreen from './screens/mainScreen/PostsScreen';
import { useDispatch } from 'react-redux';
import { authSignOutUser } from './redux/auth/authOperation';

//TODO: the functionality doesn`t match the design of the layout

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

const useRoute = (isAuth) => {
  const dispatch = useDispatch;

  const signOut = () => {
    dispatch(authSignOutUser());
  };

  if (!isAuth) {
    return (
      <AuthStack.Navigator initialRouteName='Login' options={{ headerShown: false }}>
        <AuthStack.Screen name='Login' component={LoginScreen} options={{ headerShown: false }} />
        <AuthStack.Screen
          name='Register'
          component={RegistrationScreen}
          options={{ headerShown: false }}
        />
        <AuthStack.Screen name='Home' component={Home} options={{ headerShown: false }} />
      </AuthStack.Navigator>
    );
  }
  return (
    <MainTab.Navigator
      initialRouteName='Posts'
      screenOptions={({ route }) => ({
        //   header
        headerStyle: styles.headerBox,
        headerRightContainerStyle: { paddingRight: 16 },
        headerLeftContainerStyle: { paddingLeft: 16 },
        headerTitleStyle: styles.headerTitle,
        // tabs
        tabBarActiveTintColor: '#FF6C00',
        tabBarInactiveTintColor: 'rgba(33, 33, 33, 0.8)',
        tabBarStyle: styles.tabBar,

        tabBarIcon: ({ focused, color }) => {
          let iconName;
          if (route.name === 'Posts') {
            iconName = 'grid';
          } else if (route.name === 'CreatePosts') {
            iconName = 'plus';

            return (
              <Text style={styles.tabBarItem}>
                <AntDesign name='plus' size={24} color='#FFFFFF' focused={focused} />
              </Text>
            );
          } else if (route.name === 'Profile') {
            iconName = 'user';
          }
          return <Feather name={iconName} size={24} color={color} focused={focused} />;
        },
        tabBarIconStyle: { strokeWidth: 1 },
        tabBarShowLabel: false,
      })}
    >
      <MainTab.Screen
        name='Posts'
        component={PostsScreen}
        options={({ navigation }) => ({
          title: 'Публікації',

          headerShown: false,
          iconName: 'grid',
          headerTitleAlign: 'center',
          headerRight: () => (
            <Pressable style={styles.logoutBtn} onPress={signOut}>
              <Feather name='log-out' size={24} color='#BDBDBD' />
            </Pressable>
          ),
        })}
      />
      <MainTab.Screen
        name='CreatePosts'
        component={CreatePostsScreen}
        options={({ navigation }) => ({
          title: 'Створити публікацію',
          iconName: 'plus',
          headerTitleAlign: 'center',
          headerLeft: () => (
            <HeaderBackButton
              onPress={() => navigation.navigate('Posts', { screen: 'Posts' })}
              backImage={() => (
                <Feather name='arrow-left' size={24} color='rgba(33, 33, 33, 0.8)' />
              )}
            />
          ),
          tabBarStyle: {
            display: 'none',
          },
        })}
      />
      <MainTab.Screen
        name='Profile'
        component={ProfileScreen}
        options={({ navigation }) => ({
          iconName: 'user',
          headerShown: false,
          tabBarOnPress: () => handleUserIconClick(),
        })}
      />
    </MainTab.Navigator>
  );
};

export default useRoute;

const styles = StyleSheet.create({
  headerBox: {
    height: 73,
    backgroundColor: '#FFFFFF',
    boxShadow: '0px -0.5px 0px rgba(0, 0, 0, 0.3)',
    borderBottomWidth: 1,
    borderBottomColor: '#BDBDBD',
  },
  headerTitle: {
    color: '#212121',
    fontFamily: 'Roboto_500Medium',
    fontSize: 17,
    letterSpacing: -0.408,
  },
  tabBar: {
    height: 83,
    paddingTop: 9,
    paddingBottom: 20,
    height: 70,
    backgroundColor: '#FFFFFF',
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
});
