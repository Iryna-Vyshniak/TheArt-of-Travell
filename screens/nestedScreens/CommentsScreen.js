import { useCallback, useContext, useEffect, useState } from 'react';
import {
  Alert,
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
import { useSelector } from 'react-redux';
import { db } from '../../firebase/config';
import { collection, doc, addDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { ThemeContext } from '../../shared/theme/ThemeContext';
import { useIsFocused } from '@react-navigation/native';

const CommentsScreen = ({ navigation, route }) => {
  console.log(route);

  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [focused, setFocused] = useState('');
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  const { name, userAvatar, email, userId } = useSelector((state) => state.auth);
  const { id: postId, photo, userId: postOwnerId } = route.params;
  const { theme } = useContext(ThemeContext);
  const isFocused = useIsFocused();

  // create comment
  const createComment = async () => {
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();

    const postDocRef = await doc(db, 'posts', postId);
    const newComment = {
      timePublished: Date.now().toString(),
      comment,
      name,
      email,
      userAvatar,
      date,
      time,
      owner: userId === postOwnerId ? 'user' : 'follower',
    };

    // console.log(userId + '===' + postOwnerId);

    await addDoc(collection(postDocRef, 'comments'), newComment);
    await updateDoc(postDocRef, {
      comments: [...comments, newComment],
    });
  };

  // get all comments
  const getAllComments = async () => {
    const postDocRef = await doc(db, 'posts', postId);
    onSnapshot(collection(postDocRef, 'comments'), (snapshot) => {
      const allComments = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      const sortedComments = [...allComments].sort((a, b) => {
        const dateA = a.timePublished;
        const dateB = b.timePublished;
        return dateA < dateB ? 1 : -1;
      });

      return setComments(sortedComments);
    });
  };

  // hide keyboard
  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  // get all comments
  useEffect(() => {
    getAllComments();
  }, [userId, postId]);

  // send comment
  const handleSendComment = () => {
    if (!comment.trim()) {
      Alert.alert(`Будь ласка, введіть свій коментар 😌`);
      return;
    }
    createComment();
    Keyboard.dismiss();
    Alert.alert(`Ваш коментар успішно надіслано 😉`);
    setComment('');
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableWithoutFeedback onPress={keyboardHide}>
        <View
          style={{
            ...styles.wrapper,
            flexDirection: item?.owner === 'user' ? 'row-reverse' : 'row',
          }}
        >
          <View>
            {item.userAvatar ? (
              <Image style={styles.avatar} source={{ uri: item.userAvatar }} />
            ) : (
              <Image
                style={styles.avatar}
                source={{
                  uri: 'https://images.unsplash.com/photo-1592859600972-1b0834d83747?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
                }}
              />
            )}
          </View>

          <View style={{ ...styles.commentWrapper, backgroundColor: theme.box }}>
            <Text style={{ ...styles.userName, color: theme.color }}>{item.name}</Text>
            <View style={styles.innerCommentsWrapper}>
              <Text style={{ ...styles.comments, color: theme.color }}>{item.comment}</Text>
            </View>
            <Text style={styles.commentDate}>
              {item.date} | {item.time}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={{ ...styles.container, backgroundColor: theme.background }}>
        <View style={styles.imageWrapper}>
          <Image
            style={styles.postImage}
            source={{
              uri: photo,
            }}
          />
        </View>

        <FlatList
          showsVerticalScrollIndicator={false}
          data={comments}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />

        <View style={{ ...styles.inputContainer, backgroundColor: theme.background }}>
          <TextInput
            style={{
              ...styles.input,
              color: theme.color,
              borderColor: focused === 'comment' ? '#FF6C00' : '#E8E8E8',
            }}
            multiline={true}
            selectionColor="#FF6C00"
            blurOnSubmit={true}
            placeholderTextColor="#BDBDBD"
            placeholder="Comment..."
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
          <TouchableOpacity style={styles.sendBtn} onPress={handleSendComment}>
            <Feather name="arrow-up" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CommentsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 16,
  },
  imageWrapper: {
    borderRadius: 8,
    height: 240,
    alignItems: 'center',
  },
  postImage: {
    width: 343,
    height: 240,
    borderRadius: 8,
  },
  // comment
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'baseline',
    flexGrow: 1,
    gap: 5,
    marginTop: 24,
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 50,
  },
  userName: { marginBottom: 10, fontFamily: 'Roboto_500Medium', fontSize: 13, lineHeight: 18 },
  innerCommentsWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  commentWrapper: {
    maxWidth: 320,
    marginBottom: 12,
    marginTop: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
  },

  comments: {
    fontSize: 13,
    lineHeight: 18,
    textAlign: 'left',
    marginBottom: 10,
  },

  commentDate: {
    fontSize: 10,
    lineHeight: 12,
    textAlign: 'right',
  },
  // input for send comment
  inputContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',

    marginTop: 16,
    paddingBottom: Platform.OS === 'ios' ? keyboardHeight : 0,

    alignSelf: 'flex-end',

    width: '100%',
  },
  input: {
    paddingBottom: 16,
    paddingLeft: 16,
    paddingTop: 16,
    paddingRight: 54,

    width: '100%',
    height: 50,

    fontSize: 16,
    lineHeight: 19,
    textAlignVertical: 'top',

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
});
