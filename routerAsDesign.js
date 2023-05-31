import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Pressable, Text, Alert } from 'react-native';
import { HeaderBackButton } from '@react-navigation/elements';

// icons import
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import LoginScreen from './screens/auth/LoginScreen';
import RegistrationScreen from './screens/auth/RegistrationScreen';
import PostsScreen from './screens/mainScreen/DefaultPostsScreen';
import CreatePostsScreen from './screens/mainScreen/CreatePostsScreen';
import ProfileScreen from './screens/mainScreen/ProfileScreen';
import Home from './screens/mainScreen/Home';

//TODO: the functionality matches the design of the layout

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();
const PostsTab = createBottomTabNavigator();
const ProfileTab = createBottomTabNavigator();

const useRoute = (isAuth) => {
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
      initialRouteName='Home'
      screenOptions={({ route }) => ({
        //   header
        headerStyle: styles.headerBox,
        headerRightContainerStyle: { paddingRight: 16 },
        headerLeftContainerStyle: { paddingLeft: 16 },
        headerTitleStyle: styles.headerTitle,
        // tabs
        tabBarInactiveTintColor: 'rgba(33, 33, 33, 0.8)',
        tabBarActiveTintColor: 'rgba(33, 33, 33, 0.8)',
        tabBarStyle: styles.tabBar,

        tabBarIcon: ({ focused, color }) => {
          let iconName;
          if (route.name === 'MainPosts') {
            iconName = 'grid';
          } else if (route.name === 'MainCreatePosts') {
            iconName = 'plus';

            return (
              <Text style={styles.tabBarItem}>
                <AntDesign name='plus' size={24} color='#FFFFFF' focused={focused} />
              </Text>
            );
          } else if (route.name === 'MainProfile') {
            iconName = 'user';
          }
          return <Feather name={iconName} size={24} color={color} focused={focused} />;
        },
        tabBarIconStyle: { strokeWidth: 1 },
        tabBarShowLabel: false,
      })}
    >
      <MainTab.Screen
        name='MainPosts'
        component={PostsTabNavigator}
        options={({ navigation }) => ({
          title: 'Публікації',
          iconName: 'grid',
          headerTitleAlign: 'center',
          headerRight: () => (
            <Pressable
              style={styles.logoutBtn}
              onPress={() => Alert.alert('', 'This is a log out button')}
            >
              <Feather name='log-out' size={24} color='#BDBDBD' />
            </Pressable>
          ),
          tabBarStyle: {
            display: 'none',
          },
          headerShown: false,
        })}
      />
      <MainTab.Screen
        name='MainCreatePosts'
        component={CreatePostsScreen}
        options={({ navigation }) => ({
          title: 'Створити публікацію',
          iconName: 'plus',
          headerTitleAlign: 'center',
          headerLeft: () => (
            <HeaderBackButton
              // onPress={() => navigation.navigate('Home', { screen: 'MainPosts' })}
              onPress={() => navigation.reset({ index: 0, routes: [{ name: 'MainPosts' }] })}
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
        name='MainProfile'
        component={ProfileTabNavigator}
        options={({ navigation }) => ({
          iconName: 'user',
          headerShown: false,
          tabBarStyle: {
            display: 'none',
          },
        })}
      />
    </MainTab.Navigator>
  );
};

const ProfileTabNavigator = () => {
  return (
    <ProfileTab.Navigator
      initialRouteName='ProfileProfile'
      screenOptions={({ route }) => ({
        headerStyle: styles.headerBox,
        headerRightContainerStyle: { paddingRight: 16 },
        headerLeftContainerStyle: { paddingLeft: 16 },
        headerTitleStyle: styles.headerTitle,
        tabBarInactiveTintColor: 'rgba(33, 33, 33, 0.8)',
        tabBarActiveTintColor: 'rgba(33, 33, 33, 0.8)',
        tabBarStyle: styles.tabBar,
        tabBarIcon: ({ focused, color }) => {
          let iconName;
          if (route.name === 'ProfilePosts') {
            iconName = 'grid';
          } else if (route.name === 'ProfileProfile') {
            iconName = 'user';
            return (
              <Text style={styles.tabBarItem}>
                <Feather name='user' size={24} color='#FFFFFF' focused={focused} />
              </Text>
            );
          } else if (route.name === 'ProfileCreatePosts') {
            iconName = 'plus';
            return <AntDesign name='plus' size={24} color={color} focused={focused} />;
          }
          return <Feather name={iconName} size={24} color={color} focused={focused} />;
        },
        tabBarIconStyle: { strokeWidth: 1 },
        tabBarShowLabel: false,
      })}
    >
      <ProfileTab.Screen
        name='ProfilePosts'
        component={PostsTabNavigator}
        options={({ navigation }) => ({
          title: 'Публікації',
          iconName: 'grid',
          headerTitleAlign: 'center',
          headerRight: () => (
            <Pressable
              style={styles.logoutBtn}
              onPress={() => Alert.alert('', 'This is a log out button')}
            >
              <Feather name='log-out' size={24} color='#BDBDBD' />
            </Pressable>
          ),
          headerShown: false,
          tabBarStyle: {
            display: 'none',
          },
        })}
      />
      <ProfileTab.Screen
        name='ProfileProfile'
        component={ProfileScreen}
        options={({ navigation }) => ({
          iconName: 'user',
          headerShown: false,
        })}
      />
      <ProfileTab.Screen
        name='ProfileCreatePosts'
        component={CreatePostsScreen}
        options={({ navigation }) => ({
          title: 'Створити публікацію',
          iconName: 'plus',
          headerTitleAlign: 'center',
          headerLeft: () => (
            <HeaderBackButton
              // onPress={() => navigation.navigate('Home', { screen: 'MainPosts' })}
              onPress={() => navigation.reset({ index: 0, routes: [{ name: 'MainPosts' }] })}
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
    </ProfileTab.Navigator>
  );
};

const PostsTabNavigator = () => {
  return (
    <PostsTab.Navigator
      initialRouteName='Posts'
      screenOptions={({ route }) => ({
        headerStyle: styles.headerBox,
        headerRightContainerStyle: { paddingRight: 16 },
        headerLeftContainerStyle: { paddingLeft: 16 },
        headerTitleStyle: styles.headerTitle,
        tabBarInactiveTintColor: 'rgba(33, 33, 33, 0.8)',
        tabBarActiveTintColor: 'rgba(33, 33, 33, 0.8)',
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
      <PostsTab.Screen
        name='Posts'
        component={PostsScreen}
        options={({ navigation }) => ({
          title: 'Публікації',
          iconName: 'grid',
          headerTitleAlign: 'center',
          headerRight: () => (
            <Pressable
              style={styles.logoutBtn}
              onPress={() => Alert.alert('', 'This is a log out button')}
            >
              <Feather name='log-out' size={24} color='#BDBDBD' />
            </Pressable>
          ),
        })}
      />
      <PostsTab.Screen
        name='CreatePosts'
        component={CreatePostsScreen}
        options={({ navigation }) => ({
          title: 'Створити публікацію',
          iconName: 'plus',
          headerTitleAlign: 'center',
          headerLeft: () => (
            <HeaderBackButton
              // onPress={() => navigation.navigate('Home', { screen: 'MainPosts' })}
              onPress={() => navigation.reset({ index: 0, routes: [{ name: 'MainPosts' }] })}
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
      <PostsTab.Screen
        name='Profile'
        component={ProfileTabNavigator}
        options={({ navigation }) => ({
          iconName: 'user',
          headerShown: false,
          tabBarStyle: {
            display: 'none',
          },
        })}
      />
    </PostsTab.Navigator>
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
