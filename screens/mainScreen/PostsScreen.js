import { View, Text, StyleSheet } from 'react-native';

const PostsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Posts</Text>
    </View>
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
