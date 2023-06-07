import { View, Image, Text, Pressable, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import Icon from '@expo/vector-icons/Feather';
import { useEffect, useLayoutEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase/config';

const DefaultPostsScreen = ({ route, navigation }) => {
  const [userPosts, setUserPosts] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({ title: 'Публікації' });
  }, [navigation]);

  // get all posts from server
  const getAllPosts = async () => {
    const postsRef = collection(db, 'posts');
    onSnapshot(postsRef, (querySnapshot) => {
      setUserPosts(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={userPosts}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={({ item }) => (
          <>
            <Pressable
              onPress={() => navigation.navigate('Profile', { screen: 'ProfileScreen' })}
              style={styles.userInfo}
            >
              <Image
                source={require('../../assets/avatar.png')}
                resizeMode='cover'
                style={{ width: 60, height: 60, borderRadius: 16, marginRight: 8 }}
              />
              <View>
                <Text style={styles.userName}>Natali Romanova</Text>
                <Text>email@example.com</Text>
              </View>
            </Pressable>

            <View style={styles.card}>
              <View style={styles.imageThumb}>
                <Image
                  source={{
                    uri: `${item.photo}`,
                    // uri: 'https://images.unsplash.com/photo-1592859600972-1b0834d83747?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
                  }}
                  style={{ ...styles.picture, width: 343, height: 240 }}
                />
              </View>
              <Text style={styles.imageTitle}>{item.title}</Text>
              <View style={styles.wrapperData}>
                <View style={styles.feedbackWrapper}>
                  <Pressable
                    style={styles.feedback}
                    onPress={() => navigation.navigate('Comments')}
                  >
                    <Icon
                      name='message-circle'
                      size={24}
                      color='#BDBDBD'
                      style={{ transform: [{ rotate: '-90deg' }] }}
                    />
                    <Text style={styles.feedbackCounter}>0</Text>
                  </Pressable>
                </View>
                <Pressable
                  style={styles.location}
                  onPress={() => navigation.navigate('Map', { location: item.location })}
                >
                  <Icon name='map-pin' size={24} color='#BDBDBD' />
                  <Text style={styles.locationTitle}>{item.position}</Text>
                </Pressable>
              </View>
            </View>
          </>
        )}
      />

      {/* <Button title='Map' onPress={() => navigation.navigate('Map')} /> */}
      {/* <Button title='Comments' onPress={() => navigation.navigate('Comments')} /> */}
    </SafeAreaView>
  );
};

export default DefaultPostsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: '#fff',
  },

  userInfo: {
    marginTop: 32,
    marginBottom: 32,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  userName: {
    color: '#212121',
    fontFamily: 'Roboto_700Bold',
    fontSize: 13,
    lineHeight: 15,
  },
  userMail: {
    color: '#212121',
    fontFamily: 'Roboto_400Regular',
    fontSize: 11,
    lineHeight: 13,
  },
  // card
  card: {
    marginBottom: 32,
    width: 343,
    height: 299,
  },
  imageThumb: {
    marginBottom: 8,
    width: '100%',
    height: 240,
    borderRadius: 8,
  },
  picture: {
    borderRadius: 8,
  },

  imageTitle: {
    marginBottom: 8,
    color: '#212121',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
    lineHeight: 19,
    textAlign: 'left',
  },

  // feedback & location
  wrapperData: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: 343,
  },
  feedbackWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    gap: 24,
  },
  feedback: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    gap: 4,
  },
  feedbackCounter: {
    color: '#BDBDBD',
    fontFamily: 'Roboto_400Regular',
    fontSize: 16,
    lineHeight: 19,
  },
  location: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    gap: 4,
  },
  locationTitle: {
    color: '#212121',
    fontFamily: 'Roboto_400Regular',
    fontSize: 16,
    lineHeight: 19,
    textDecorationLine: 'underline',
  },
});
