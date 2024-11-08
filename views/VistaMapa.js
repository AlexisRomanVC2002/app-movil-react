import { StyleSheet, View } from "react-native";
import MapView from "react-native-maps";
import React from "react";
import { FAB, Title } from "react-native-paper";

function VistaMapa(props) {
  const { latitude, longitude } = props.route.params;

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        followsUserLocation={true}
        showsUserLocation={true}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          longitudeDelta: 0,
          latitudeDelta: 0,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

export default VistaMapa;
