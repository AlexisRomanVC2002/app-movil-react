import { useEffect } from "react";
import { useState } from "react";
import {
  Button,
  View,
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
} from "react-native";
import * as Location from "expo-location";

function VistaGPS(props) {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {

    let subscription;

    async function getCurrentLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        setError('Permiso a la ubicacion fue denegada.');
        return;
      }

      subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 10000, // Actualiza cada 10 segundos
          distanceInterval: 1, // Actualiza si se mueve más de 1 metro
        },
        (newLocation) => {
          setLocation(newLocation);
        }
      );
    }

    getCurrentLocation();


    return () => {
        if (subscription) {
          subscription.remove();
        }
      };

  }, []);

  console.log(location);

  return (
    <ScrollView style={{ ...styles.container, backgroundColor: "#302e43" }}>
      <Text style={styles.title}>Ubicación GPS</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Latitud</Text>
        <TextInput style={styles.input} placeholder="37.421998" value={location ? location.coords.latitude + "" : "Cargando..."} />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Longitud</Text>
        <TextInput
          style={styles.input}
          placeholder="-122.084"
          value={location ? location.coords.longitude + "" : "Cargando..."}
        />
      </View>

      <Button
        title="Ver Mapa"
        onPress={() => props.navigation.navigate("VistaMapaDireccion", {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
        })}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  rb: {
    color: "#fff",
  },

  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "white",
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: "white",
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    padding: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#eea844",
    padding: 16,
    borderRadius: 4,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 50,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default VistaGPS;
