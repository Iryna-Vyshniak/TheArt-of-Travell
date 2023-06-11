import 'react-native-gesture-handler';
import { StyleSheet, Text } from 'react-native';
import { Provider } from 'react-redux';

import { store } from './redux/store';
import { theme } from './shared/theme/theme';

import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';

import { ThemeProvider } from './shared/theme/ThemeContext';
import MainNavigation from './components/Main';

export default function App() {
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider>
      <Provider store={store}>
        <MainNavigation />
      </Provider>
    </ThemeProvider>
  );
}
