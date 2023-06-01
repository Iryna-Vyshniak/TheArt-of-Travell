import { useLayoutEffect } from 'react';
import { View, Image, StyleSheet, TouchableWithoutFeedback } from 'react-native';

//import { Feather } from '@expo/vector-icons';
//  <Feather name='arrow-up' size={24} color='#FFFFFF' />;

const CommentsScreen = ({ navigation, route }) => {
  useLayoutEffect(() => {
    navigation.setOptions({ title: 'Коментарі' });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback>
        <View style={styles.imageWrapper}>
          <Image
            style={styles.postImage}
            source={{
              uri: 'https://images.unsplash.com/photo-1592859600972-1b0834d83747?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
            }}
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default CommentsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 16,
  },
  imageWrapper: {
    alignItems: 'center',
  },
  postImage: {
    width: 343,
    height: 240,
    borderRadius: 8,
  },
});
