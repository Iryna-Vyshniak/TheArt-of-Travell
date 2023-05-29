import { View, Text, StyleSheet } from 'react-native';

const CommentsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Comments</Text>
    </View>
  );
};

export default CommentsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
