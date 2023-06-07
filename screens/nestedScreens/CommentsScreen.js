import { useLayoutEffect, useState } from 'react';
import {
  ScrollView,
  SafeAreaView,
  View,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  TextInput,
  Keyboard,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import { Feather } from '@expo/vector-icons';

const data = [
  {
    id: '1',
    avatar:
      'https://images.unsplash.com/photo-1685016725413-454a50708d58?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80',
    name: 'Jason',
    text: 'Really love your most recent photo. I’ve been trying to capture the same thing for a few months and would love some tips!',
    date: '04 june 2023 | 08:40',
  },
  {
    id: '2',
    avatar:
      'https://images.unsplash.com/photo-1684932815774-f32dfa457f85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80',
    name: 'Laura',
    text: 'A fast 50mm like f1.8 would help with the bokeh. I’ve been using primes as they tend to get a bit sharper images.',
    date: '04 june 2023 | 09:14',
  },
  {
    id: '3',
    avatar:
      'https://images.unsplash.com/photo-1682857203811-3141bf2ba486?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80',
    name: 'Harry',
    text: 'Thank you! That was very helpful!',
    date: '05 june 2023 | 09:40',
  },
  {
    id: '4',
    avatar: '',
    name: 'Kelly',
    text: 'Thank you!',
    date: '07 june 2023 | 09:40',
  },
];

const CommentsScreen = ({ navigation, route }) => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [focused, setFocused] = useState('');
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  const createPost = () => {};

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  useLayoutEffect(() => {
    navigation.setOptions({ title: 'Коментарі', tabBarStyle: { display: 'none' } });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <TouchableWithoutFeedback onPress={keyboardHide}>
          <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.imageWrapper}>
              <Image
                style={styles.postImage}
                source={{
                  uri: 'https://images.unsplash.com/photo-1592859600972-1b0834d83747?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
                }}
              />
            </View>

            <FlatList
              data={data}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={styles.wrapper}>
                  <View>
                    {item.avatar ? (
                      <Image style={styles.avatar} source={{ uri: item.avatar }} />
                    ) : (
                      <Image
                        style={styles.avatar}
                        source={{
                          uri: 'https://images.unsplash.com/photo-1592859600972-1b0834d83747?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
                        }}
                      />
                    )}
                  </View>

                  <View style={styles.commentWrapper}>
                    <Text style={styles.userName}>{item.name}</Text>
                    <View style={styles.innerCommentsWrapper}>
                      <Text style={styles.comments}>{item.text}</Text>
                    </View>
                    <Text style={styles.commentDate}>{item.date}</Text>
                  </View>
                </View>
              )}
            />
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={{ ...styles.input, borderColor: focused === 'comment' ? '#FF6C00' : '#E8E8E8' }}
          selectionColor='#FF6C00'
          blurOnSubmit={true}
          placeholderTextColor='#BDBDBD'
          placeholder='Comment...'
          value={comment}
          onChangeText={(value) => setComment(value)}
          onBlur={() => {
            setFocused('');
            setIsShowKeyboard(false);
          }}
          onFocus={() => {
            setFocused('comment');
            setIsShowKeyboard(true);
          }}
        />
        <TouchableOpacity style={styles.sendBtn} onPress={createPost}>
          <Feather name='arrow-up' size={24} color='#FFFFFF' />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CommentsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 16,
  },
  innerContainer: {
    flex: 1,
  },
  imageWrapper: {
    alignItems: 'center',
  },
  postImage: {
    width: 343,
    height: 240,
    borderRadius: 8,
  },
  wrapper: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 28, height: 28, marginRight: 5, borderRadius: 50 },
  userName: { marginBottom: 10 },
  innerCommentsWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  inputContainer: {
    width: '100%',
    backgroundColor: '#FFFFFF',
  },
  input: {
    paddingBottom: 16,
    paddingLeft: 16,
    paddingTop: 16,

    width: '100%',
    height: 50,

    fontSize: 16,
    lineHeight: 19,

    color: '#212121',
    backgroundColor: '#F6F6F6',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 20,
  },
  sendBtn: {
    position: 'absolute',
    top: 8,
    right: 15,
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: '#FF6C00',
    borderRadius: 50,
    width: 34,
    height: 34,
  },
  photoWrapper: {
    marginTop: 32,
    marginBottom: 20,
    borderRadius: 8,
    height: 240,
  },
  commentWrapper: {
    maxWidth: 320,
    marginBottom: 12,
    marginTop: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    borderRadius: 6,
  },

  comments: {
    color: '#212121',
    fontSize: 13,
    lineHeight: 18,
    textAlign: 'left',
  },

  commentDate: {
    color: '#BDBDBD',
    fontSize: 10,
    lineHeight: 12,
    textAlign: 'right',
  },
});
