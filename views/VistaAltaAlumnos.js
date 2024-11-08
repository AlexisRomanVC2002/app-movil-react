import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  TextInput,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import Conexion from "../Control/Firebase";
import DateTimePicker from "@react-native-community/datetimepicker";
import RadioButtonGroup, {RadioButtonItem} from "expo-radio-button";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import VisFoto from "./VisFotos";


const VistaAltaAlumnos = (props) => {
  const [alumno, setAlumno] = useState({
    AluNC: "",
    AluNombre: "",
    AluApellidos: "",
    AluCorreo: "",
    AluTelefono: "",
    AluSexo: ""
  });

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [sexo, setSexo] = useState('Femenino');
  const [isFotoSelected, setIsFotoSelected] = useState(false);

  const handlerChangeGenero = (value) => {
    setSexo(value);
  }

  const [carrera, setCarrera] = useState({
    aluCarrera: "Seleccionar carrera..."
  })

  const handlerChangeCarrera = (aluCarrera, value) => {
    setCarrera({
      ...carrera, [aluCarrera]: value
    });
  }

  const data = [
    {
      label: "Ingenieria en sistemas", value: "1"
    },
    {
      label: "Ingenieria en Gestión", value: "2"
    },
    {
      label: "Licenciatura en Turismo", value: "3"
    },
    {
      label: "Ingenieria en Electromecanica", value: "4"
    },
    {
      label: "Arquitectura", value: "5"
    },
    {
      label: "Licenciatura en Gatronomia", value: "6"
    }
  ]

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const guardarAlumno = async () => {
    if (alumno.AluNC === "" || alumno.AluNombre === "") {
      alert("Favor de llenar todos los datos.");
      return;
    }

    if(!isFotoSelected){
      alert("Favor de ingresar una foto.");
      return;
    }

    await Conexion.collection("tblAlumnos").add({
      aluApellidos: alumno.AluApellidos,
      aluCorreo: alumno.AluCorreo,
      aluNC: alumno.AluNC,
      aluNombre: alumno.AluNombre,
      aluTelefono: alumno.AluTelefono,
      aluFNac: date.toLocaleDateString([], { dateStyle: "medium" }),
      aluSexo: alumno.AluSexo,
      aluCarrera: carrera.aluCarrera,
    });

    alert("Alumno Guardado Correctamente.");
    LimpiarCampos();

    props.navigation.navigate("VistaAlumnos");
  };

  const LimpiarCampos = () => {
    const alum = { ...alumno };

    alum.AluApellidos = "";
    alum.AluCorreo = "";
    alum.AluNC = "";
    alum.AluNombre = "";
    alum.AluTelefono = "";
    alum.AluSexo = "Femenino"

    setAlumno(alum);
  };

  const handleTextChange = (key, value) => {
    const copyAlumno = { ...alumno };
    copyAlumno[key] = value;

    setAlumno(copyAlumno);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View>
          <Text style={styles.text}>Numero de control</Text>
          <TextInput
            style={styles.inputText}
            placeholder="200110183"
            value={alumno.AluNC}
            onChangeText={(value) => handleTextChange("AluNC", value)}
          ></TextInput>
        </View>

        <View>
          <Text style={styles.text}>Nombre</Text>
          <TextInput
            style={styles.inputText}
            placeholder="Nombre"
            value={alumno.AluNombre}
            onChangeText={(value) => handleTextChange("AluNombre", value)}
          ></TextInput>
        </View>

        <View>
          <Text style={styles.text}>Apellidos</Text>
          <TextInput
            style={styles.inputText}
            placeholder="Apellido"
            value={alumno.AluApellidos}
            onChangeText={(value) => handleTextChange("AluApellidos", value)}
          ></TextInput>
        </View>

        <View>
          <Text style={styles.text}>Correo</Text>
          <TextInput
            style={styles.inputText}
            placeholder="pv200110183@vallarta.tecmm.edu.mx"
            value={alumno.AluCorreo}
            onChangeText={(value) => handleTextChange("AluCorreo", value)}
          ></TextInput>
        </View>

        <View>
          <Text style={styles.text}>Telefono</Text>
          <TextInput
            style={styles.inputText}
            placeholder="3221880126"
            value={alumno.AluTelefono}
            onChangeText={(value) => handleTextChange("AluTelefono", value)}
          ></TextInput>
        </View>

        <View style={{width:'100%' }}>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={data}
              search
              maxHeight={400}
              labelField="label"
              valueField="value"
              placeholder={carrera.aluCarrera}
              searchPlaceholder="Search..."
              onChange={(item) => handlerChangeCarrera('aluCarrera',item.label)}      
              renderLeftIcon={() => (
                <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
              )}
            />
        </View>

        <View>
          <Text style={styles.text}>Seleccione uno</Text>
          <View>
            <RadioButtonGroup
              selected={sexo}
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
        
        <VisFoto nc={alumno.AluNC} setIsFotoSelected={setIsFotoSelected} /> 

        <SafeAreaView>
          <View>
            <Button title="Fecha de nacimiento" onPress={showDatepicker} />
          </View>
          <Text style={styles.fecha}>
            Fecha:
            {date.toLocaleString([], { dateStyle: "medium" })}
          </Text>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              onChange={onChange}
            />
          )}
        </SafeAreaView>

        <View>
          <Button
            style={{ margin: 80 }}
            title="Guardar Alumnos"
            onPress={() => guardarAlumno()}
          ></Button>
        </View>

        <Text>Alumno: {JSON.stringify(alumno)}</Text>
      </View>
    </ScrollView>
  );
};

export default VistaAltaAlumnos;

const styles = StyleSheet.create({
  container: {
    width: "80%",
    padding: 10,
    alignContent: "center",
    backgroundColor: "#8E9AE7",
    alignItems: "center",
    alignSelf: "center",
  },
  inputText: {
    borderBottomWidth: 0.5,
    height: 28,
    width: 280,
    fontSize: 20,
    alignSelf: "center",
    borderBottomColor: "#8e93a1",
    textAlign: "center",
    marginBottom: 15,
    backgroundColor: "#727777",
  },
  text: {
    borderBottomWidth: 0.5,
    height: 35,
    width: 280,
    fontSize: 20,
    alignSelf: "center",
    borderBottomColor: "#8e93a1",
    textAlign: "center",
    marginBottom: 10,
    backgroundColor: "blue",
    color: "white",
  },
  fecha: {
    borderBottomWidth: 0.5,
    height: 28,
    width: 275,
    fontSize: 15,
    alignSelf: "center",
    borderBottomColor: "#8e93a1",
    textAlign: "center",
    marginBottom: 15,
    backgroundColor: "#727777",
  },

  rb:{
    width: '85%',
    fontWeight:'bold',
    height:30,
    fontSize:20, 
    marginBottom:10, 
    backgroundColor:'#727777',
  },

  dropdown: {
    backgroundColor:'blue',
    margin: 5,
    height: 60,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 12,
    color:'white',
  },
  selectedTextStyle: {
    fontSize: 12,
    color:'white',
  },
  iconStyle: {
    width: 20,
    height: 20,
},
inputSearchStyle: {
  height: 40,
  fontSize: 16,
},

});
