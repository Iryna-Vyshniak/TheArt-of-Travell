import { View, Text, StyleSheet } from 'react-native';

const CreatePostsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Create Posts</Text>
    </View>
  );
};

export default CreatePostsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
