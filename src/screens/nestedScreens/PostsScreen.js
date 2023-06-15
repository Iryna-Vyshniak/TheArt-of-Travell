import {
  View,
  Image,
  Text,
  Pressable,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  RefreshControl,
} from 'react-native';
import Icon from '@expo/vector-icons/Feather';
import { useContext, useEffect, useState } from 'react';
import { collection, doc, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useSelector } from 'react-redux';
import { ThemeContext } from '../../shared/theme/ThemeContext';

const PostsScreen = ({ route, navigation }) => {
  const [userPosts, setUserPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const { name, email, userAvatar, userId } = useSelector((state) => state.auth);
  const { theme, darkMode } = useContext(ThemeContext);

  // get all posts from server and ordered by desc
  const getAllPosts = async () => {
    try {
      setIsLoading(true);
      setError(false);

      const postsRef = collection(db, 'posts');
      const sortedPostsQuery = query(postsRef, orderBy('timePublished', 'desc'));

      onSnapshot(sortedPostsQuery, (snapshot) => {
        const sortedPosts = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setUserPosts(sortedPosts);
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
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
    <SafeAreaView style={{ ...styles.container, backgroundColor: theme.background }}>
      {darkMode ? (
        <Image
          style={styles.backgroundImage}
          source={require(`../../../assets/darkF.jpg`)}
          blurRadius={15}
        />
      ) : null}
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
          <Text style={{ ...styles.userName, color: theme.color }}>{name}</Text>
          <Text style={{ ...styles.userMail, color: theme.color }}>{email}</Text>
        </View>
      </Pressable>

      {isLoading && (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ActivityIndicator size="large" />
          <Text style={{ marginTop: 15 }}>Loading...</Text>
        </View>
      )}
      {error && Alert.alert('', 'Упс, немає постів... Будь ласка, оновіть сторінку')}
      {!error && !isLoading && (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={userPosts}
          keyExtractor={(_, idx) => idx.toString()}
          refreshControl={<RefreshControl refreshing={isLoading} />}
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
                <Text style={{ ...styles.imageTitle, color: theme.color }}>{item.title}</Text>
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
                          color: item.comments?.length > 0 ? theme.color : '#BDBDBD',
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
                          color: item.likes?.length > 0 ? theme.color : '#BDBDBD',
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
                    <Text style={{ ...styles.locationTitle, color: theme.color }}>
                      {item.position}
                    </Text>
                  </Pressable>
                </View>
              </View>
            </>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default PostsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },

  userInfo: {
    marginTop: 32,
    marginBottom: 32,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  userName: {
    fontFamily: 'Roboto_700Bold',
    fontSize: 13,
    lineHeight: 15,
  },
  userMail: {
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
    fontFamily: 'Roboto_400Regular',
    fontSize: 16,
    lineHeight: 19,
    textDecorationLine: 'underline',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    flex: 1,
    resizeMode: 'cover',
  },
});
