import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { store } from './redux/store';

import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';

import { ThemeProvider } from './shared/theme/ThemeContext';
import MainNavigation from './components/Main';
import { StatusBarLine } from './components/StatusBar';

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
        <StatusBarLine />
        <MainNavigation />
      </Provider>
    </ThemeProvider>
  );
}
