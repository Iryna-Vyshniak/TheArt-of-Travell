import { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapScreen = ({ route }) => {
  const [location, setLocation] = useState({});

  // set location
  useEffect(() => {
    if (route.params) {
      setLocation({
        latitude: route.params.location.latitude,
        longitude: route.params.location.longitude,
      });
    }
  }, [route.params]);

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
