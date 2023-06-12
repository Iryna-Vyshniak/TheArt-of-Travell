import { StatusBar } from 'react-native';

export const StatusBarLine = () => {
  return (
    <StatusBar
      barStyle="light-content"
      hidden={false}
      backgroundColor="#4d0000"
      translucent={true}
    />
  );
};
