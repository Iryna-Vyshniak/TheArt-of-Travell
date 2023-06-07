import {
  SafeAreaView,
  ImageBackground,
  View,
  Image,
  Pressable,
  Text,
  Alert,
  FlatList,
} from 'react-native';
import { StyleSheet } from 'react-native';
import Bg from '../../assets/login-bg.jpg';
import Icon from '@expo/vector-icons/Feather';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authSignOutUser } from '../../redux/auth/authOperation';
import { db } from '../../firebase/config';
import { collection, query, onSnapshot, where, getDocs } from 'firebase/firestore';

// import BtnLogOut from '../../components/BtnLogOut';

const ProfileScreen = ({ navigation }) => {
  const [userAvatar, setUserAvatar] = useState(null);

  const [userPosts, setUserPosts] = useState([]);
  const { userId, name, avatarImage } = useSelector((state) => state.auth);

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
  }, []);

  const dispatch = useDispatch();

  const handleAddAvatar = () => {
    setUserAvatar(require('../../assets/avatar.png'));
  };

  const handleRemoveAvatar = () => {
    setUserAvatar(null);
  };

  const signOut = () => {
    dispatch(authSignOutUser());
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ImageBackground source={Bg} style={styles.imageBg}>
        <View style={styles.container}>
          <View style={styles.boxProfile}>
            {userAvatar ? (
              <Image source={require('../../assets/avatar.png')} style={styles.avatarImage} />
            ) : null}
            <Pressable
              onPress={userAvatar ? handleRemoveAvatar : handleAddAvatar}
              accessibilityLabel={userAvatar ? 'Remove Avatar' : 'Add Avatar'}
              style={{
                ...styles.btnAdd,
                borderColor: userAvatar ? '#E8E8E8' : '#FF6C00',
              }}
            >
              {userAvatar ? (
                <Icon
                  name='plus'
                  size={20}
                  color='#E8E8E8'
                  style={{ transform: [{ rotate: '-45deg' }] }}
                />
              ) : (
                <Icon name='plus' size={20} color='#FF6C00' />
              )}
            </Pressable>
          </View>
          <Pressable style={styles.logoutBtn} onPress={signOut}>
            <Icon name='log-out' size={24} color='#BDBDBD' />
          </Pressable>
          <Text style={styles.name}>{name}</Text>

          {!userPosts && (
            <View style={styles.emptyBox}>
              <Text style={styles.noPosts}>У Вас немає постів</Text>
            </View>
          )}

          {userPosts && (
            <FlatList
              keyExtractor={(item) => item.id}
              data={userPosts}
              renderItem={({ item }) => (
                <View style={styles.card}>
                  <View style={styles.imageThumb}>
                    <Image
                      source={{
                        uri: item.photo,
                      }}
                      style={{ ...styles.picture, width: 343, height: 240 }}
                    />
                  </View>

                  <Text style={styles.imageTitle}>{item.title}</Text>
                  <View style={styles.wrapperData}>
                    <View style={styles.feedbackWrapper}>
                      <Pressable
                        onPress={() => navigation.navigate('Comments', { postId: item.id })}
                        style={styles.feedback}
                      >
                        <Icon
                          name='message-circle'
                          size={24}
                          color='#FF6C00'
                          style={{ transform: [{ rotate: '-90deg' }] }}
                        />
                        <Text style={styles.feedbackCounter}>8</Text>
                      </Pressable>
                      <Pressable style={styles.feedback}>
                        <Icon name='thumbs-up' size={24} color='#FF6C00' />
                        <Text style={styles.feedbackCounter}>153</Text>
                      </Pressable>
                    </View>
                    {/* <Pressable
                    onPress={() => Alert.alert('', 'Link to future map')}
                    style={styles.location}
                  > */}
                    <Pressable
                      onPress={() => navigation.navigate('Map', { location: item.location })}
                      style={styles.location}
                    >
                      <Icon name='map-pin' size={24} color='#BDBDBD' />
                      <Text style={styles.locationTitle}>{item.position}</Text>
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
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    height: 240,
  },
  noPosts: {
    marginTop: -32,
    marginBottom: 32,
    color: '#212121',
    fontFamily: 'Roboto_500Medium',
    fontSize: 30,
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

    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  // avatar
  boxProfile: {
    position: 'relative',
    top: -60,
    alignSelf: 'center',
    width: 120,
    height: 120,
    backgroundColor: '#F6F6F6',
    borderRadius: 16,
  },

  btnAdd: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 12,
    right: -12.5,
    width: 25,
    height: 25,
    borderRadius: 50,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderStyle: 'solid',
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
    color: '#212121',
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
    backgroundColor: '#FFFFFF',
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
    color: '#212121',
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
