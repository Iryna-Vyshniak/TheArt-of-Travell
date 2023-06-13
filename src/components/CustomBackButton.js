import { TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useContext } from 'react';
import { ThemeContext } from '../shared/theme/ThemeContext';

export const CustomBackButton = ({ onPress }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <TouchableOpacity onPress={onPress}>
      <Feather name="arrow-left" size={24} color={theme.color} />
    </TouchableOpacity>
  );
};
