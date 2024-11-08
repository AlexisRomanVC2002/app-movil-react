import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  NavigationContainer,
  useNavigation,
  DrawerActions,
} from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/Entypo";

import VistaInicio from "./VistaInicio.js";
import VistaConsultaAlumnos from "./VistaConsultaAlumnos.js";
import VistaGrafica from "./VistaGrafica.js";
import VistaGPS from "./VistaGPS.js";
import VistaAltaAlumnos from "./VistaAltaAlumnos.js";
import VistaEditarAlumnos from "./VistaEditarAlumnos.js";
import VistaFotos from "./VisFotos.js";
import VistaMapa from "./VistaMapa.js";
import VistaMapaDireccion from "./VisMapaDireccion.js";

const DrawerApp = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      screenOptions={{
        statusBarcolor: "#0163d2",
        headerStyle: {
          backgroundColor: "#302e43",
        },
        headerTintColor: "#fff",
        headerTitleAlign: "center",
        headerShown: true,
      }}
    >
      <Drawer.Screen
        name="VistaInicio"
        component={VistaInicio}
        options={{
          title: "Home",
          drawerIcon: (config) => <Icon size={23} name="home" />,
        }}
      />

      <Drawer.Screen
        name="VistaAlumnos"
        component={VistaConsultaAlumnos}
        options={{
          title: "Alumnos",
          drawerIcon: (config) => <Icon size={23} name="user" />,
        }}
      />

      <Drawer.Screen
        name="VistaAltaAlumnos"
        component={VistaAltaAlumnos}
        options={{
          drawerItemStyle: {
            display: "none",
          },
        }}
      />

      <Drawer.Screen
        name="VistaEditarAlumnos"
        component={VistaEditarAlumnos}
        options={{
          drawerItemStyle: {
            display: "none",
          },
        }}
      />

      <Drawer.Screen
        name="VistaGrafica"
        component={VistaGrafica}
        options={{
          title: "Grafica",
          drawerIcon: (config) => <Icon size={23} name="line-graph" />,
        }}
      />

      <Drawer.Screen
        name="VistaGPS"
        component={VistaGPS}
        options={{
          title: "GPS",
          drawerIcon: (config) => <Icon size={23} name="compass" />,
        }}
      />

      <Drawer.Screen
        name="VistaMapa"
        component={VistaMapa}
        options={{
          drawerItemStyle: {
            display: "none",
          },
        }}
      />

      <Drawer.Screen
        name="VistaMapaDireccion"
        component={VistaMapaDireccion}
        options={{
          drawerItemStyle: {
            display: "none",
          },
        }}
      />

      <Drawer.Screen
        name="VistaFotos"
        component={VistaFotos}
        options={{
          drawerItemStyle: {
            display: "none",
          },
        }}
      />
    </Drawer.Navigator>
  );
};

function VistaMenuDrawer() {
  return <DrawerApp />;
}

export default VistaMenuDrawer;
