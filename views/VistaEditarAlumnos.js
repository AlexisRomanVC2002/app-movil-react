import {
  ActivityIndicator,
  View,
  TextInput,
  ScrollView,
  Button,
  StyleSheet,
  Alert,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import React from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import VisFoto from "./VisFotos";
import { storage } from "../Control/Firebase";

const VistaEditarAlumnos = ({ navigation, route }) => {
  const { aluNombre } = route.params;

  const [urlImage, setUrlImage] = useState(null);
  const [isFotoSelected, setIsFotoSelected] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [mode, setMode] = useState("date");
  const [actualizando, setActualizando] = useState(false);
  const [alumno, setAlumno] = useState({
    aluNC: "",
    aluNombre: "",
    aluApellidos: "",
    aluCorreo: "",
    aluTelefono: "",
    aluSexo: "",
    aluFNac: "",
    aluCarrera: "",
  });

  const handlerChangeCarrera = (aluCarrera, value) => {
    setAlumno({
      ...alumno,
      aluCarrera: value,
    });
  };

  const data = [
    {
      label: "Ingenieria en sistemas",
      value: "1",
    },
    {
      label: "Ingenieria en Gestión",
      value: "2",
    },
    {
      label: "Licenciatura en Turismo",
      value: "3",
    },
    {
      label: "Ingenieria en Electromecanica",
      value: "4",
    },
    {
      label: "Arquitectura",
      value: "5",
    },
    {
      label: "Licenciatura en Gatronomia",
      value: "6",
    },
  ];

  useEffect(() => {
    navigation.setOptions({ title: aluNombre });
  }, [aluNombre]);

  useEffect(() => {
    obtenerAlumnoPorId(route.params.id);
  }, [route]);

  const obtenerAlumnoPorId = async (id) => {
    try {
      await conexion
        .collection("tblAlumnos")
        .doc(id)
        .get()
        .then(async (documentSnapshot) => {
          if (documentSnapshot.exists) {
            setAlumno({
              ...alumno,
              aluNC: documentSnapshot.data().aluNC,
              aluNombre: documentSnapshot.data().aluNombre,
              aluApellidos: documentSnapshot.data().aluApellidos,
              aluCorreo: documentSnapshot.data().aluCorreo,
              aluTelefono: documentSnapshot.data().aluTelefono,
              aluSexo:
                documentSnapshot.data().aluSexo === "" ||
                !documentSnapshot.data().aluSexo
                  ? "Masculino"
                  : documentSnapshot.data().aluSexo,
              aluFNac:
                documentSnapshot.data().aluFNac == null || documentSnapshot.data().aluFNac === "" ?
                new Date().toLocaleDateString() : documentSnapshot.data().aluFNac,
              aluCarrera:
                documentSnapshot.data().aluCarrera ?? "Seleccionar carrera...",
            });

            const storageRef = storage().ref(
              `photos/${documentSnapshot.data().aluNC}`
            );

            storageRef
              .getDownloadURL()
              .then((url) => {
                setUrlImage(url);
                setIsFotoSelected(true);
              })
              .catch((error) => {
                setUrlImage(null);
                console.log(error);
              });
          }
        });
    } catch (err) {
      alert(err);
    }
  };

  const actualizarAlumno = async () => {
    if (alumno.aluNombre === "" || alumno.aluNombre.toString().trim() === "") {
      Alert.alert("🔴 Error", "El nombre del alumno no puede estar vacio.");
      return;
    }

    if (alumno.aluNC === "" || alumno.aluNC.toString().trim() === "") {
      Alert.alert(
        "🔴 Error",
        "El Numero de Control del alumno no puede estar vacio."
      );
      return;
    }

    if (!isFotoSelected) {
      Alert.alert("🔴 Error", "Es necesario tomar una foto del Alumno.");
      return;
    }

    try {
      setActualizando(true);
      await conexion
        .collection("tblAlumnos")
        .doc(route.params.id)
        .update(alumno);
    } catch (err) {
      alert(err);
      setActualizando(false);
      return;
    }

    Alert.alert(alumno.aluNombre, "Alumno Actualizado Con Exito ✔");
    setActualizando(false);
    navigation.navigate("VistaAlumnos");
  };

  const handleSubmit = () => {
    Alert.alert(
      "Actualizar Alumno",
      `¿Está seguro de actualizar el alumno: ${aluNombre}?`,
      [
        {
          text: "Cancelar",
          onPress: () => {},
          style: "cancel",
        },
        { text: "Si", onPress: actualizarAlumno },
      ]
    );
  };

  const handleTextChange = (Key, Value) => {
    setAlumno({
      ...alumno,
      [Key]: Value,
    });
  };

  const onChangeDateTime = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShowDatePicker(false);
    setAlumno({
      ...alumno,
      aluFNac: currentDate.toLocaleDateString(),
    });
    //setDate(currentDate);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const handlerChangeGenero = (value) => {
    setAlumno({
      ...alumno,
      aluSexo: value,
    });
  };

  return (
    <ScrollView style={{ ...styles.container, backgroundColor: "#302e43" }}>
      {actualizando && <ActivityIndicator size="large" />}

      <Text style={styles.title}>Actualizar Datos del Estudiante</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Número de control</Text>
        <TextInput
          style={styles.input}
          placeholder="200110183"
          value={alumno.aluNC}
          onChangeText={(value) => handleTextChange("aluNC", value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nombre</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          value={alumno.aluNombre}
          onChangeText={(value) => handleTextChange("aluNombre", value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Apellidos</Text>
        <TextInput
          style={styles.input}
          placeholder="Apellidos"
          value={alumno.aluApellidos}
          onChangeText={(value) => handleTextChange("aluApellidos", value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Correo</Text>
        <TextInput
          style={styles.input}
          placeholder="correo@ejemplo.com"
          value={alumno.aluCorreo}
          onChangeText={(value) => handleTextChange("aluCorreo", value)}
          keyboardType="email-address"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Teléfono</Text>
        <TextInput
          style={styles.input}
          placeholder="3221880126"
          value={alumno.aluTelefono}
          onChangeText={(value) => handleTextChange("aluTelefono", value)}
          keyboardType="phone-pad"
        />
      </View>

      <View style={{ marginBottom: 20 }}>
        <Text style={styles.label}>Carrera</Text>
        <Dropdown
          style={styles.input}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={400}
          labelField="label"
          valueField="value"
          placeholder={alumno.aluCarrera}
          searchPlaceholder="Search..."
          onChange={(item) => handlerChangeCarrera("aluCarrera", item.label)}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color="black"
              name="Safety"
              size={20}
            />
          )}
        />
      </View>

      <View style={{ marginBottom: 20 }}>
        <Text style={styles.label}>Sexo</Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <RadioButtonGroup
            selected={alumno.aluSexo}
            onSelected={(Value) => handlerChangeGenero(Value)}
            radioBackground="white"
          >
            <RadioButtonItem
              value="Masculino"
              label={<Text style={styles.rb}>Masculino</Text>}
            />
            <RadioButtonItem
              value="Femenino"
              label={<Text style={styles.rb}>Femenino</Text>}
            />
          </RadioButtonGroup>
        </View>
      </View>

      <SafeAreaView>
        <Text style={styles.label}>Fecha Nacimiento</Text>
        <View>
          <Button title={alumno.aluFNac} onPress={showDatepicker} />
        </View>

        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={alumno.aluFNac
              ? (() => {
                  const dateParts = alumno.aluFNac.split("/");
                  const fechaNacimiento = new Date(
                    +dateParts[2],
                    dateParts[1] - 1,
                    +dateParts[0]
                  );
                  return fechaNacimiento;
                })()
              : new Date()
            }
            mode={mode}
            is24Hour={true}
            onChange={onChangeDateTime}
          />
        )}
      </SafeAreaView>

      <View style={{ marginTop: 50 }}>
        <Text style={styles.label}>Foto Perfil</Text>
        <VisFoto
          nc={alumno.aluNC}
          setIsFotoSelected={setIsFotoSelected}
          urlPhoto={urlImage}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Actualizar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default VistaEditarAlumnos;

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
