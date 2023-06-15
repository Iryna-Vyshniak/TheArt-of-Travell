import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useContext } from 'react';
import { ThemeContext } from '../../shared/theme/ThemeContext';

const SettingScreen = ({ navigation }) => {
  const { darkMode, setDarkMode, theme } = useContext(ThemeContext);

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: theme.settingsBg,
      }}
    >
      <TouchableOpacity
        style={{
          ...styles.switcher,
          backgroundColor: theme.settingsBg,
        }}
        onPress={() => setDarkMode(!darkMode)}
      >
        <Ionicons
          size={24}
          color={theme.icon}
          marginRight={10}
          name={darkMode ? 'sunny' : 'moon'}
        />
        <Text
          style={{
            ...styles.titleTheme,
            color: theme.color,
          }}
        >
          {darkMode ? 'Обрати світлу тему' : 'Обрати темну тему'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  switcher: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 16,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center',
  },
  titleTheme: {
    fontFamily: 'Roboto_500Medium',
    fontSize: 18,
    lineHeight: 35,
  },
});
