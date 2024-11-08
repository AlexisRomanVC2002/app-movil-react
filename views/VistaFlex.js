import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

const VistaFlex =  () => {
  return (

    <View style={styles.container}>

      <View>
      <View style={styles.containerTitle}>
        <Text style={styles.title}>Práctica de Flex 1</Text>
      </View>

      <View style={styles.filas}>
        <View style={styles.elementos}><Text>1</Text></View>
        <View style={styles.elementos}><Text>2</Text></View>
        <View style={styles.elementos}><Text>3</Text></View>
      </View>

      <View style={styles.filas}>
        <View style={styles.elementos}><Text>4</Text></View>
        <View style={styles.elementos}><Text>5</Text></View>
        <View style={styles.elementos}><Text>6</Text></View>
      </View>

      <View style={styles.filas}>
        <View style={styles.elementos}><Text>7</Text></View>
        <View style={styles.elementos}><Text>8</Text></View>
        <View style={styles.elementos}><Text>9</Text></View>
      </View>

    </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#a992e0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filas: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 40,
    backgroundColor: '#96dc8d',
    padding: 10,
  },
  elementos: {
    width: 80,
    height: 150,
    backgroundColor: 'pink',
    borderWidth: 2,
    borderStyle: 'dashed',
    opacity: 0.7,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  containerTitle: {
    backgroundColor: 'blue',
    padding: 20,
    width: 'auto',
  },

  title: {
    backgroundColor: '#a992e0',
    padding: 20,
    borderWidth: 4,
    borderRadius: 10,
    borderColor: "#fff",
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  }

});

export default VistaFlex;