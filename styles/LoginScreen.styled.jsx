import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },

  image: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  keyboard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',

    height: '100%',
    width: '100%',
  },

  container: {
    height: '61%',
    width: '100%',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: '#fff',
  },

  title: {
    marginTop: 32,
    marginBottom: 33,

    color: '#212121',

    fontFamily: 'Roboto_500Medium',
    fontSize: 30,
    lineHeight: 35,
    textAlign: 'center',
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    gap: 16,
    backgroundColor: 'transparent',
    paddingHorizontal: 16,
    width: '100%',
  },

  input: {
    marginHorizontal: 'auto',
    padding: 16,
    paddingBottom: 15,
    width: '100%',
    height: 50,
    backgroundColor: '#F6F6F6',

    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 8,

    fontFamily: 'Roboto_400Regular',
    fontSize: 16,
    lineHeight: 19,
    color: '#212121',
  },

  passwordContainer: {
    position: 'relative',
    marginBottom: 43,
  },

  passwordIndicator: {
    position: 'absolute',
    top: '50%',
    right: 16,
    transform: [{ translateY: -6 }],
  },

  showText: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 16,
    lineHeight: 19,
    color: '#1B4371',
  },

  btn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    marginHorizontal: 'auto',
    padding: 16,

    height: 51,

    backgroundColor: '#FF6C00',
    borderRadius: 100,
  },

  BtnText: {
    color: '#fff',
    fontFamily: 'Roboto_400Regular',
    fontSize: 16,
    lineHeight: 19,
    textAlign: 'center',
  },

  loginBtn: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 188,
    height: 19,
  },

  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },

  loginText: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 16,
    lineHeight: 19,
    textAlign: 'center',

    color: '#1B4371',
  },

  loginLink: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 16,
    lineHeight: 19,
    textAlign: 'center',
    textDecorationLine: 'underline',

    color: '#1B4371',
  },
});
