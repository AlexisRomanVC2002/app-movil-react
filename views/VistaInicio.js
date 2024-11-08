import { StyleSheet, Text, View, ImageBackground } from "react-native";
import React from "react";

const VistaInicio = () => {
  return (
    <ImageBackground
    source={require('../img/background.png')}
    style={styles.background}
    >
      <View style={styles.container}>
        <Text style={{color: 'white'}}>VistaInicio</Text>
      </View>
    </ImageBackground>
  );
};

export default VistaInicio;

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center'
    },

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }

});
