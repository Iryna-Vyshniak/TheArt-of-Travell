import { useEffect, useLayoutEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapScreen = ({ route, navigation }) => {
  // console.log('ROUTE MAP', route);
  // console.log('ROUTE MAP', route.params.location.latitude);
  // console.log('ROUTE MAP', route.params.location.longitude);

  const [location, setLocation] = useState({});

  useEffect(() => {
    if (route.params) {
      setLocation({
        latitude: route.params.location.latitude,
        longitude: route.params.location.longitude,
      });
    }
  }, [route.params]);

  useLayoutEffect(() => {
    navigation.setOptions({ title: 'Maпа' });
  }, [navigation]);

  return (
    <View style={styles.container}>
      {location ? (
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
          <Marker
            title='You are here'
            coordinate={{
              latitude: location?.latitude,
              longitude: location?.longitude,
            }}
            description='Your current location'
          />
        </MapView>
      ) : (
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
            title='I`m here in future'
          />
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
