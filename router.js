import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { View } from 'react-native';
// icons import
import { Feather } from '@expo/vector-icons';
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
      screenOptions={{
        tabBarActiveTintColor: '#FF6C00',
        tabBarStyle: {
          height: 83,
          paddingTop: 9,
          backgroundColor: '#FFFFFF',
          boxShadow: '0px -0.5px 0px rgba(0, 0, 0, 0.3)',
          paddingLeft: 45,
        },

        tabBarShowLabel: false,
      }}
    >
      <MainTab.Screen
        name='Posts'
        component={PostsScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Feather focused={focused} name='grid' color={color} size={24} />
          ),
        }}
      />
      <MainTab.Screen
        name='CreatePosts'
        component={CreatePostsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 70,
                height: 40,
                backgroundColor: '#FF6C00',
                borderRadius: 20,
              }}
            >
              <AntDesign focused={focused} name='plus' color='#FFFFFF' size={24} />
            </View>
          ),
        }}
      />
      <MainTab.Screen
        name='Profile'
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Feather focused={focused} name='user' color={color} size={24} />
          ),
        }}
      />
    </MainTab.Navigator>
  );
};

export default useRoute;

//<Feather name="user" size={24} color="rgba(33, 33, 33, 0.8)" />
//<AntDesign name="plus" size={13} color="#FFFFFF" />
// <Feather name="grid" size={24} color="rgba(33, 33, 33, 0.8)" />
// <Feather name="arrow-left" size={24} color="rgba(33, 33, 33, 0.8)" />
// <Feather name="log-out" size={24} color="#BDBDBD" />

// <Feather name="trash-2" size={24} color="#BDBDBD" />
// <Feather name="map-pin" size={24} color="#BDBDBD" />
// <Feather name="camera" size={24} color="#FFFFFF" />
// <Feather name="arrow-up" size={24} color="#FFFFFF" />
