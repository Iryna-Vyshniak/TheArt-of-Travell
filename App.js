import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';

import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';

import { ThemeProvider } from './src/shared/theme/ThemeContext';
import MainNavigation from './src/components/Main';
import { StatusBarLine } from './src/components/StatusBar';

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
