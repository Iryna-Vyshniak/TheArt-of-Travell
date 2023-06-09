import {
  View,
  Image,
  Text,
  Pressable,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import Icon from '@expo/vector-icons/Feather';
import { useEffect, useLayoutEffect, useState } from 'react';
import { collection, doc, onSnapshot, query, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useSelector } from 'react-redux';

const DefaultPostsScreen = ({ route, navigation }) => {
  const [userPosts, setUserPosts] = useState([]);

  const { name, email, userAvatar, userId } = useSelector((state) => state.auth);

  // add header
  useLayoutEffect(() => {
    navigation.setOptions({ title: 'Публікації', tabBarStyle: { display: 'flex' } });
  }, [navigation]);

  // get all posts from server
  const getAllPosts = async () => {
    const postsRef = query(collection(db, 'posts'));
    onSnapshot(postsRef, (snapshot) => {
      setUserPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  };

  // get all posts
  useEffect(() => {
    getAllPosts();
  }, []);

  // add or remove likes
  const toggleLike = async (postId, likes, likeStatus) => {
    try {
      const userExist = likes.includes(userId);

      if (userExist) {
        const updatedLikes = likes.filter((user) => user !== userId);
        const postRef = doc(db, 'posts', postId);
        await setDoc(postRef, { likes: updatedLikes, likeStatus: false }, { merge: true });
      } else {
        const updatedLikes = [...likes, userId];
        const postRef = doc(db, 'posts', postId);
        await setDoc(postRef, { likes: updatedLikes, likeStatus: true }, { merge: true });
      }
    } catch (error) {
      console.log('error-message', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Pressable
        onPress={() => navigation.navigate('Profile', { screen: 'ProfileScreen' })}
        style={styles.userInfo}
      >
        <Image
          source={{ uri: userAvatar }}
          resizeMode="cover"
          style={{ width: 60, height: 60, borderRadius: 16, marginRight: 8 }}
        />
        <View>
          <Text style={styles.userName}>{name}</Text>
          <Text>{email}</Text>
        </View>
      </Pressable>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={userPosts}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={({ item }) => (
          <>
            <View style={styles.card}>
              <View style={styles.imageThumb}>
                <Image
                  source={{
                    uri: `${item.photo}`,
                  }}
                  style={{ ...styles.picture, width: 343, height: 240 }}
                />
              </View>
              <Text style={styles.imageTitle}>{item.title}</Text>
              <View style={styles.wrapperData}>
                <View style={styles.feedbackWrapper}>
                  <TouchableOpacity
                    style={styles.feedback}
                    onPress={() => navigation.navigate('Comments', item)}
                  >
                    <Icon
                      name="message-circle"
                      size={24}
                      color={item.comments?.length > 0 ? '#FF6C00' : '#BDBDBD'}
                      style={{ transform: [{ rotate: '-90deg' }] }}
                    />
                    <Text
                      style={{
                        ...styles.feedbackCounter,
                        color: item.comments?.length > 0 ? '#212121' : '#BDBDBD',
                      }}
                    >
                      {item.comments ? item.comments?.length : 0}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.feedback}
                    onPress={() => toggleLike(item.id, item.likes, item.likeStatus)}
                  >
                    <Icon
                      name="thumbs-up"
                      size={24}
                      color={item.likes?.length > 0 ? '#FF6C00' : '#BDBDBD'}
                    />
                    <Text
                      style={{
                        ...styles.feedbackCounter,
                        color: item.likes?.length > 0 ? '#212121' : '#BDBDBD',
                      }}
                    >
                      {item.likes ? item.likes?.length : 0}
                    </Text>
                  </TouchableOpacity>
                </View>
                <Pressable
                  style={styles.location}
                  onPress={() => navigation.navigate('Map', { location: item.location })}
                >
                  <Icon name="map-pin" size={24} color="#BDBDBD" />
                  <Text style={styles.locationTitle}>{item.position}</Text>
                </Pressable>
              </View>
            </View>
          </>
        )}
      />
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
