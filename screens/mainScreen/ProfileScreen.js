import { SafeAreaView, ImageBackground, View, Image, Pressable, Text, Alert } from 'react-native';
import { StyleSheet } from 'react-native';
import Bg from '../../assets/login-bg.jpg';
import Icon from '@expo/vector-icons/Feather';

import { useState } from 'react';

const ProfileScreen = ({ navigation }) => {
  const [userAvatar, setUserAvatar] = useState(null);

  const handleAddAvatar = () => {
    setUserAvatar(require('../../assets/avatar.png'));
  };

  const handleRemoveAvatar = () => {
    setUserAvatar(null);
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ImageBackground source={Bg} resizeMode='cover' style={styles.image}>
        <View style={styles.container}>
          <View style={styles.box}>
            {userAvatar ? (
              <Image source={require('../../assets/avatar.png')} resizeMode='cover' />
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

          <Pressable
            style={styles.logoutBtn}
            onPress={() => Alert.alert('', 'This is a log out button')}
          >
            <Icon name='log-out' size={24} color='#BDBDBD' />
          </Pressable>
          <Text style={styles.name}>Natali Romanova</Text>
          <View style={styles.card}>
            <View style={styles.imageThumb}>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1592859600972-1b0834d83747?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
                }}
                style={{ ...styles.picture, width: 343, height: 240 }}
              />
            </View>
            <Text style={styles.imageTitle}>Ліс</Text>
            <View style={styles.wrapperData}>
              <View style={styles.feedbackWrapper}>
                <Pressable onPress={() => navigation.navigate('Comments')} style={styles.feedback}>
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
              <Pressable onPress={() => navigation.navigate('Map')} style={styles.location}>
                <Icon name='map-pin' size={24} color='#BDBDBD' />
                <Text style={styles.locationTitle}>Ukraine</Text>
              </Pressable>
            </View>
          </View>
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
  image: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  container: {
    alignItems: 'center',
    paddingBottom: 43,
    width: '100%',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: '#fff',
  },
  // avatar
  box: {
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
