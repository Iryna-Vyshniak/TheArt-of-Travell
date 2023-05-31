import { moduleName, StyleSheet, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
//import HomeScreen from '../nestedScreens/PostsScreen';
import CommentsScreen from '../nestedScreens/CommentsScreen';
import MapScreen from '../nestedScreens/MapScreen';
import { Feather } from '@expo/vector-icons';
import PostsScreen from '../nestedScreens/PostsScreen';

const NestedStack = createStackNavigator();

//TODO: the functionality matches the design of the layout

const DefaultPostsScreen = ({ navigation, route }) => {
  if (route.state && route.state.index > 0) {
    navigation.setOptions({ tabBarVisible: false });
  } else ({ tabBarVisible: true });

  return (
    <NestedStack.Navigator>
      <NestedStack.Screen
        // name='Home'
        // component={HomeScreen}
        name='Home'
        component={PostsScreen}
        options={{ headerShown: false }}
        unmountOnBlur={true}
      />
      <NestedStack.Screen
        name='Comments'
        component={CommentsScreen}
        options={{
          headerTitle: 'Коментарі',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Home' }] })}
            >
              <Feather name='arrow-left' size={24} color='#212121' style={{ marginLeft: 16 }} />
            </TouchableOpacity>
          ),
        }}
        unmountOnBlur={true}
      />
      <NestedStack.Screen
        name='Map'
        component={MapScreen}
        options={{
          headerTitle: 'Мапа',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Home' }] })}
            >
              <Feather name='arrow-left' size={24} color='#212121' style={{ marginLeft: 16 }} />
            </TouchableOpacity>
          ),
        }}
        unmountOnBlur={true}
      />
    </NestedStack.Navigator>
  );
};

export default DefaultPostsScreen;

//TODO: the functionality doesn`t match the design of the layout

// const PostsScreen = ({ navigation }) => {
//   return (
//     <NestedStack.Navigator>
//       <NestedStack.Screen
//         name='Home'
//         component={HomeScreen}
//         options={{ headerShown: false }}
//         unmountOnBlur={true}
//       />
//       <NestedStack.Screen
//         name='Comments'
//         component={CommentsScreen}
//         options={{
//           headerTitle: 'Коментарі',
//           headerLeft: () => (
//             <TouchableOpacity onPress={() => navigation.goBack()}>
//               <Feather name='arrow-left' size={24} color='#212121' style={{ marginLeft: 16 }} />
//             </TouchableOpacity>
//           ),
//         }}
//         unmountOnBlur={true}
//       />
//       <NestedStack.Screen
//         name='Map'
//         component={MapScreen}
//         options={{
//           headerTitle: 'Мапа',
//           headerLeft: () => (
//             <TouchableOpacity onPress={() => navigation.goBack()}>
//               <Feather name='arrow-left' size={24} color='#212121' style={{ marginLeft: 16 }} />
//             </TouchableOpacity>
//           ),
//         }}
//         unmountOnBlur={true}
//       />
//     </NestedStack.Navigator>
//   );
// };

// export default PostsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
