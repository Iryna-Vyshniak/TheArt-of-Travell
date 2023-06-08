import { moduleName, StyleSheet, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import CommentsScreen from '../nestedScreens/CommentsScreen';
import MapScreen from '../nestedScreens/MapScreen';
import { Feather } from '@expo/vector-icons';

import DefaultPostsScreen from '../nestedScreens/DefaultPostsScreen';
import { authSignOutUser } from '../../redux/auth/authOperation';
import { useDispatch } from 'react-redux';

const NestedStack = createStackNavigator();

const PostsScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(authSignOutUser());
  };

  return (
    <NestedStack.Navigator>
      <NestedStack.Screen
        name="PostsDefault"
        component={DefaultPostsScreen}
        options={{
          headerLeft: null,
          headerStyle: styles.headerBox,
          headerRightContainerStyle: { paddingRight: 16 },
          headerLeftContainerStyle: { paddingLeft: 16 },
          headerTitleStyle: styles.headerTitle,
          headerTitleAlign: 'center',
          headerRight: () => (
            <TouchableOpacity onPress={signOut}>
              <Feather name="log-out" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ),
        }}
      />
      <NestedStack.Screen
        name="Comments"
        component={CommentsScreen}
        options={({ navigation, route }) => ({
          headerStyle: styles.headerBox,
          headerRightContainerStyle: { paddingRight: 16 },
          headerLeftContainerStyle: { paddingLeft: 16 },
          headerTitleStyle: styles.headerTitle,
          headerTitleAlign: 'center',
        })}
      />
      <NestedStack.Screen
        name="Map"
        component={MapScreen}
        options={{
          headerStyle: styles.headerBox,
          headerRightContainerStyle: { paddingRight: 16 },
          headerLeftContainerStyle: { paddingLeft: 16 },
          headerTitleStyle: styles.headerTitle,
          headerTitleAlign: 'center',
        }}
      />
    </NestedStack.Navigator>
  );
};

export default PostsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
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
});
