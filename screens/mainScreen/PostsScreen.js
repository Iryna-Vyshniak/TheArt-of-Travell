import { moduleName, StyleSheet, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import CommentsScreen from '../nestedScreens/CommentsScreen';
import MapScreen from '../nestedScreens/MapScreen';
import { Feather } from '@expo/vector-icons';

import DefaultPostsScreen from '../nestedScreens/DefaultPostsScreen';

const NestedStack = createStackNavigator();

//TODO: the functionality doesn`t matches the design of the layout

const PostsScreen = ({ navigation, route }) => {
  if (route.state && route.state.index > 0) {
    navigation.setOptions({ tabBarVisible: false });
  } else ({ tabBarVisible: true });

  return (
    <NestedStack.Navigator>
      <NestedStack.Screen
        name='PostsDefault'
        component={DefaultPostsScreen}
        options={{
          headerStyle: styles.headerBox,
          headerRightContainerStyle: { paddingRight: 16 },
          headerLeftContainerStyle: { paddingLeft: 16 },
          headerTitleStyle: styles.headerTitle,
          headerTitleAlign: 'center',
          headerRight: () => (
            <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('Login')}>
              <Feather name='log-out' size={24} color='#BDBDBD' />
            </TouchableOpacity>
          ),
        }}
      />
      <NestedStack.Screen
        name='Comments'
        component={CommentsScreen}
        options={{
          headerStyle: styles.headerBox,
          headerRightContainerStyle: { paddingRight: 16 },
          headerLeftContainerStyle: { paddingLeft: 16 },
          headerTitleStyle: styles.headerTitle,
          headerTitleAlign: 'center',
        }}
      />
      <NestedStack.Screen
        name='Map'
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
});

//TODO: the functionality match the design of the layout

// const PostsScreen = ({ navigation, route }) => {
//   if (route.state && route.state.index > 0) {
//     navigation.setOptions({ tabBarVisible: false });
//   } else ({ tabBarVisible: true });

//   return (
//     <NestedStack.Navigator>
//       <NestedStack.Screen
//         name='PostsDefault'
//         component={DefaultPostsScreen}
//         options={{ headerShown: false }}
//         unmountOnBlur={true}
//       />
//       <NestedStack.Screen
//         name='Comments'
//         component={CommentsScreen}
//         options={{
//           title: 'Коментарі',
//           headerLeft: () => (
//             <TouchableOpacity
//               onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Home' }] })}
//             >
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
//           title: 'Мапа',
//           headerLeft: () => (
//             <TouchableOpacity
//              onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Home' }] })}
//             >
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
