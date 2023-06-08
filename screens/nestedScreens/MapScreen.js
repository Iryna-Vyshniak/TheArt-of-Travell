import { useEffect, useLayoutEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapScreen = ({ route, navigation }) => {
  const [location, setLocation] = useState({});

  // add own header and hide tab bottom
  useLayoutEffect(() => {
    navigation.getParent().setOptions({ tabBarStyle: { display: 'none' } });
    navigation.setOptions({ title: 'Maпа' });
    return () => {
      navigation.getParent().setOptions({
        tabBarStyle: {
          display: 'flex',
          height: 83,
          paddingTop: 9,
          boxShadow: '0px -0.5px 0px rgba(0, 0, 0, 0.3)',
        },
      });
    };
  }, [navigation]);

  // set location
  useEffect(() => {
    if (route.params) {
      setLocation({
        latitude: route.params.location.latitude,
        longitude: route.params.location.longitude,
      });
    }
  }, [route.params]);

  //console.log(location);

  return (
    <View style={styles.container}>
      {location && (
        <MapView
          style={{ flex: 1 }}
          region={{
            ...location,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          mapType="standard"
          minZoomLevel={8}
        >
          <Marker title="You are here" coordinate={location} description="Photo take here" />
        </MapView>
      )}
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
