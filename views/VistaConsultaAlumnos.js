import {
  StyleSheet,
  Text,
  Button,
  ScrollView,
  View,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useEffect, useState } from "react";
import { ListItem, Avatar } from "react-native-elements";
import { storage } from "../Control/Firebase";

const VisConsultaAlumnos = (props) => {
  const [alumnos, setAlumnos] = useState([]);
  const [imageURLs, setImageURLs] = useState({});

  useEffect(() => {
    // Cargar las URLs de las imágenes cuando se actualice la lista de alumnos
    alumnos.forEach((alumno) => {
      const storageRef = storage().ref(`photos/${alumno.aluNC}`);

      storageRef
        .getDownloadURL()
        .then((url) => {
          setImageURLs((prevURLs) => ({
            ...prevURLs,
            [alumno.aluNC]: url,
          }));
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }, [alumnos]);

  const mostrarAlumnos = async () => {
    try {
      const rsAlumnos = [];
      await conexion
        .collection("tblAlumnos")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const { aluNC, aluNombre, aluApellidos, aluCorreo } = doc.data();
            rsAlumnos.push({
              id: doc.id,
              aluNC,
              aluNombre,
              aluApellidos,
              aluCorreo,
            });
          });
        });
      setAlumnos(rsAlumnos);
    } catch (e) {
      alert("Mensaje: " + e);
    }
  };

  useEffect(() => {
    const refresh = props.navigation.addListener(
      "focus",
      async () => {
        mostrarAlumnos();
      },
      []
    );
    return refresh;
  }, [props]);

  return (
    <View style={{ flexGrow: 1, backgroundColor: "#302e43" }}>
      <ScrollView style={{ display: "flex" }}>
        <Button
          title="Alta alumnos"
          style={{ backgroundColor: "red", with: "10%" }}
          onPress={() => props.navigation.navigate("VistaAltaAlumnos")}
        />
        <View style={{ display: "flex", gap: 0 }}>
          {alumnos.map((alumno) => {
            const numberRandom = Math.round(Math.random() * 100);

            return (
              <TouchableOpacity
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 20,
                  paddingVertical: 20,
                }}
                key={alumno.id}
                onPress={() =>
                  props.navigation.navigate("VistaEditarAlumnos", {
                    id: alumno.id,
                    aluNombre: alumno.aluNombre,
                    fecha: alumno.aluFNac,
                    carrera: alumno.aluCarrera,
                    generoActual: alumno.aluGenero,
                  })
                }
              >
                <View
                  style={{ display: "flex", flexDirection: "row", gap: 10 }}
                >
                  <ListItem.Chevron style={{ marginLeft: 10 }} />
                  <Avatar
                    rounded
                    title="usr"
                    size="large"
                    source={{
                      uri: imageURLs[alumno.aluNC] || null,
                    }}
                  />
                </View>

                <View>
                  <Text style={styles.titleList}>{alumno.aluNC}</Text>
                  <Text style={{ color: "white" }}>
                    <Text style={{ ...styles.tagTitle, color: "white" }}>
                      Nombre:
                    </Text>{" "}
                    {alumno.aluNombre}
                  </Text>
                  <Text ellipsizeMode="tail" style={{ color: "white" }}>
                    <Text style={styles.tagTitle}>Correo:</Text>{" "}
                    {alumno.aluCorreo ? alumno.aluCorreo : "N/A"}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default VisConsultaAlumnos;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "black",
  },

  titleList: {
    fontWeight: "bold",
    color: "white",
  },

  tagTitle: {
    fontWeight: "bold",
  },

  container: {
    flex: 1,
    backgroundColor: "red",
    alignItems: "center", //centrado horizontal
    justifyContent: "space-between", //centrado vertical
    height: "100%",
    width: "100%",
    display: "flex",
  },
  filaCabecera: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "grey",
    width: "90%",
    height: "10%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  filaForm: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#2c77c7",
    width: "90%",
    height: "88%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  estiloBoton: {
    width: "30%",
    height: "90%",
    backgroundColor: "#7ac72c",
    display: "flex",

    borderRadius: 10,
  },
  estiloTextoBoton: {
    fontSize: 20,
    color: "white",
    textAlign: "center",
    paddingTop: "8%",
  },
});
