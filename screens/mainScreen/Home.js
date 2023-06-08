import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Pressable, Text } from 'react-native';
import { HeaderBackButton } from '@react-navigation/elements';

// icons import
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import ProfileScreen from './ProfileScreen';
import CreatePostsScreen from './CreatePostsScreen';
import DefaultPostsScreen from './PostsScreen';
import { useDispatch } from 'react-redux';
import { authSignOutUser } from '../../redux/auth/authOperation';

const MainTab = createBottomTabNavigator();

export const Home = ({ navigation }) => {
  const dispatch = useDispatch;

  const signOut = () => {
    dispatch(authSignOutUser());
  };

  return (
    <MainTab.Navigator
      initialRouteName="Posts"
      screenOptions={({ route }) => ({
        //   header
        headerStyle: styles.headerBox,
        headerRightContainerStyle: { paddingRight: 16 },
        headerLeftContainerStyle: { paddingLeft: 16 },
        headerTitleStyle: styles.headerTitle,
        // tabs
        tabBarActiveTintColor: '#FF6C00',
        tabBarInactiveTintColor: 'rgba(33, 33, 33, 0.8)',

        tabBarIcon: ({ focused, color }) => {
          let iconName;
          if (route.name === 'Posts') {
            iconName = 'grid';
          } else if (route.name === 'CreatePosts') {
            iconName = 'plus';
            return (
              <Text style={styles.tabBarItem}>
                <AntDesign name="plus" size={24} color="#FFFFFF" focused={focused} />
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
        name="Posts"
        component={DefaultPostsScreen}
        options={{
          title: 'Публікації',
          headerShown: false,
          iconName: 'grid',
          headerTitleAlign: 'center',
          headerRight: () => (
            <Pressable style={styles.logoutBtn} onPress={signOut}>
              <Feather name="log-out" size={24} color="#BDBDBD" />
            </Pressable>
          ),
        }}
      />
      <MainTab.Screen
        name="CreatePosts"
        component={CreatePostsScreen}
        options={({ navigation }) => ({
          title: 'Створити публікацію',
          iconName: 'plus',
          headerTitleAlign: 'center',
          headerLeft: () => (
            <HeaderBackButton
              onPress={() => navigation.navigate('Posts', { screen: 'Posts' })}
              backImage={() => (
                <Feather name="arrow-left" size={24} color="rgba(33, 33, 33, 0.8)" />
              )}
            />
          ),
          tabBarStyle: {
            display: 'none',
          },
        })}
      />
      <MainTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={({ navigation }) => ({
          iconName: 'user',
          headerShown: false,
        })}
      />
    </MainTab.Navigator>
  );
};

export default Home;

const styles = StyleSheet.create({
  headerBox: {
    height: 83,
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
