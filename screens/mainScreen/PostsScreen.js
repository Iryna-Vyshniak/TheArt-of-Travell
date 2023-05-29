import { moduleName, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../nestedScreens/HomeScreen';
import CommentsScreen from '../nestedScreens/CommentsScreen';
import MapScreen from '../nestedScreens/MapScreen';

const NestedStack = createStackNavigator();

const PostsScreen = () => {
  return (
    <NestedStack.Navigator>
      <NestedStack.Screen name='Home' component={HomeScreen} />
      <NestedStack.Screen name='Comments' component={CommentsScreen} />
      <NestedStack.Screen name='Map' component={MapScreen} />
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
});
