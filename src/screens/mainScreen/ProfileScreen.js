import {
  SafeAreaView,
  ImageBackground,
  View,
  Image,
  Pressable,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { StyleSheet } from 'react-native';
import Bg from '../../../assets/login-bg.jpg';
import Icon from '@expo/vector-icons/Feather';

import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authSignOutUser } from '../../redux/auth/authOperation';
import { db } from '../../firebase/config';
import { collection, query, onSnapshot, where, getDocs } from 'firebase/firestore';
import { Avatar } from '../../components/Avatar';
import { ThemeContext } from '../../shared/theme/ThemeContext';

const ProfileScreen = ({ route, navigation }) => {
  const [userPosts, setUserPosts] = useState([]);
  const { userId, name } = useSelector((state) => state.auth);

  const { theme, darkMode } = useContext(ThemeContext);

  const getUserPosts = async () => {
    try {
      const postRef = query(collection(db, 'posts'), where('userId', '==', `${userId}`));
      onSnapshot(postRef, (snapshot) => {
        setUserPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  useEffect(() => {
    getUserPosts();
    if (route.params?.commentsCount) {
      setCommentsCount((prevCount) => ({
        ...prevCount,
        [route.params.postId]: route.params.commentsCount,
      }));
    }
  }, [route.params]);

  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(authSignOutUser());
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ImageBackground source={Bg} style={styles.imageBg}>
        <View
          style={{
            ...styles.container,
            backgroundColor: theme.profile,
            borderWidth: 0.5,
            borderColor: theme.shadow,
          }}
        >
          {darkMode ? (
            <Image
              source={require('../../../assets/darkF.jpg')}
              style={styles.backgroundImage}
              blurRadius={15}
            />
          ) : null}
          <Avatar />
          <Pressable style={styles.logoutBtn} onPress={signOut}>
            <Icon name="log-out" size={24} color="#BDBDBD" />
          </Pressable>
          <Text style={{ ...styles.name, color: theme.color }}>{name}</Text>

          {userPosts?.length === 0 && (
            <View style={styles.emptyBox}>
              <Text style={styles.noPosts}>У вас немає постів 😌</Text>
            </View>
          )}

          {userPosts && (
            <FlatList
              showsVerticalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              data={userPosts}
              renderItem={({ item }) => (
                <View style={{ ...styles.card, backgroundColor: 'transparent' }}>
                  <View style={styles.imageThumb}>
                    <Image
                      source={{
                        uri: item.photo,
                      }}
                      style={{ ...styles.picture, width: 343, height: 240 }}
                    />
                  </View>

                  <Text style={{ ...styles.imageTitle, color: theme.color }}>{item.title}</Text>
                  <View style={styles.wrapperData}>
                    <View style={styles.feedbackWrapper}>
                      <TouchableOpacity
                        onPress={() => navigation.navigate('Comments', item)}
                        style={styles.feedback}
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
                      <TouchableOpacity style={styles.feedback}>
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
                    {/* <Pressable
                    onPress={() => Alert.alert('', 'Link to future map')}
                    style={styles.location}
                  > */}
                    <Pressable
                      onPress={() => navigation.navigate('Map', { location: item.location })}
                      style={styles.location}
                    >
                      <Icon name="map-pin" size={24} color="#BDBDBD" />
                      <Text style={{ ...styles.locationTitle, color: theme.color }}>
                        {item.position}
                      </Text>
                    </Pressable>
                  </View>
                </View>
              )}
            />
          )}
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  mainContainer: {
    position: 'relative',
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
  imageBg: {
    flex: 1,
    resizeMode: 'cover',
  },
  emptyBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    height: 240,
  },
  noPosts: {
    marginTop: -32,
    marginBottom: 32,
    color: '#FF6C00',
    fontFamily: 'Roboto_400Regular',
    fontSize: 20,
    lineHeight: 35,
    textAlign: 'center',
  },
  // header
  container: {
    position: 'relative',
    flex: 1,
    alignItems: 'center',
    marginTop: 147,
    paddingHorizontal: 16,

    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  // logOut
  logoutBtn: {
    position: 'absolute',
    top: 22,
    right: 18,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
    resizeMode: 'cover',
  },
  // name
  name: {
    marginTop: -32,
    marginBottom: 32,
    fontFamily: 'Roboto_500Medium',
    fontSize: 30,
    lineHeight: 35,
    textAlign: 'center',
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
    resizeMode: 'cover',
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
    width: '110%',
    resizeMode: 'cover',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
});
