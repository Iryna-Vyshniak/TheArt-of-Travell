import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Pressable } from 'react-native';
import { HeaderBackButton } from '@react-navigation/elements';
// icons import
import { Feather } from '@expo/vector-icons';
import Icon from '@expo/vector-icons/Feather';
import { AntDesign } from '@expo/vector-icons';

import LoginScreen from './screens/auth/LoginScreen';
import RegistrationScreen from './screens/auth/RegistrationScreen';
import PostsScreen from './screens/mainScreen/PostsScreen';
import CreatePostsScreen from './screens/mainScreen/CreatePostsScreen';
import ProfileScreen from './screens/mainScreen/ProfileScreen';

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen
          name='Register'
          component={RegistrationScreen}
          options={{ headerShown: false }}
        />
        <AuthStack.Screen name='Login' component={LoginScreen} options={{ headerShown: false }} />
      </AuthStack.Navigator>
    );
  }
  return (
    <MainTab.Navigator
      initialRouteName='Posts'
      blurRadius={13.5914}
      screenOptions={({ route }) => ({
        //   header
        headerStyle: styles.headerBox,
        headerRightContainerStyle: { paddingRight: 16 },
        headerLeftContainerStyle: { paddingLeft: 16 },
        headerTitleAlign: 'center',
        headerPressColor: '#FF6C00',
        headerTitleStyle: styles.headerTitle,
        // tabs
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: 'rgba(33, 33, 33, 0.8)',
        tabBarActiveBackgroundColor: '#FF6C00',
        tabBarInactiveBackgroundColor: 'transparent',
        tabBarStyle: {
          height: 83,
          paddingTop: 9,
          paddingBottom: 20,
          paddingHorizontal: 80,
          height: 70,
          backgroundColor: '#FFFFFF',
          boxShadow: '0px -0.5px 0px rgba(0, 0, 0, 0.3)',
        },
        tabBarItemStyle: {
          width: 70,
          height: 40,
          borderRadius: 20,
        },
        tabBarIcon: ({ focused, color }) => {
          let iconName;

          if (route.name === 'Posts') {
            iconName = 'grid';
          } else if (route.name === 'CreatePosts') {
            iconName = 'plus';
            return <AntDesign name='plus' size={13} color={color} focused={focused} />;
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
        options={{
          title: 'Публікації',
          headerRight: () => (
            <Pressable>
              <Feather name='log-out' size={24} color='#BDBDBD' />
            </Pressable>
          ),
        }}
      />
      <MainTab.Screen
        name='CreatePosts'
        component={CreatePostsScreen}
        options={{
          title: 'Створити публікацію',
          headerLeft: () => (
            <HeaderBackButton
              backImage={() => (
                <Feather name='arrow-left' size={24} color='rgba(33, 33, 33, 0.8)' />
              )}
            />
          ),
          tabBarStyle: {
            display: 'none',
          },
        }}
      />
      <MainTab.Screen name='Profile' component={ProfileScreen} options={{ headerShown: false }} />
    </MainTab.Navigator>
  );
};

export default useRoute;

const styles = StyleSheet.create({
  headerBox: {
    backgroundColor: '#FFFFFF',
    boxShadow: '0px -0.5px 0px rgba(0, 0, 0, 0.3)',
    borderBottomWidth: 1,
    borderBottomColor: '#BDBDBD',
  },
  headerTitle: {
    fontFamily: 'Roboto_500Medium',
    fontSize: 17,
    color: '#212121',
    letterSpacing: -0.408,
  },
});

// <Feather name="trash-2" size={24} color="#BDBDBD" />
// <Feather name="map-pin" size={24} color="#BDBDBD" />
// <Feather name="camera" size={24} color="#FFFFFF" />
// <Feather name="arrow-up" size={24} color="#FFFFFF" />
