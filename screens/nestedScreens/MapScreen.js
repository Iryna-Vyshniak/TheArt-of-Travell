import { useEffect, useLayoutEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapScreen = ({ route, navigation }) => {
  // console.log('ROUTE MAP', route);
  // console.log('ROUTE MAP', route.params.location.latitude);
  // console.log('ROUTE MAP', route.params.location.longitude);

  const [location, setLocation] = useState({});

  useLayoutEffect(() => {
    navigation.setOptions({ title: 'Maпа' });
  }, [navigation]);

  useEffect(() => {
    if (route.params) {
      setLocation({
        latitude: route.params.location.latitude,
        longitude: route.params.location.longitude,
      });
    }
  }, [route.params]);

  // console.log('latitude', typeof Number(location?.latitude));
  // console.log('longitude', typeof Number(location?.longitude));
  // console.log('latitude', location?.latitude);
  // console.log('longitude', location?.longitude);
  // console.log('latitude TYPE OF', typeof location?.latitude);
  // console.log('longitude TYPE OF', typeof location?.longitude);
  // console.log('latitude', location?.latitude);
  // console.log('longitude', location?.longitude);

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
          mapType='standard'
          minZoomLevel={8}
        >
          <Marker title='You are here' coordinate={location} description='Photo take here' />
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
