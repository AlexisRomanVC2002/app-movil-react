import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList,ScrollView,Dimensions } from 'react-native';
import firebase from '../Database/Firebase';
import { LineChart } from 'react-native-chart-kit';

const VistaGrafica = () => {
  const [data, setData] = useState([]);
  const [labels, setLabels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const database = firebase.database();
    const reference = database.ref('/Raiz/Temperatura');

    const onDataChange = snapshot => {
      const dataArray = [];
      const labelArray = [];
      snapshot.forEach(childSnapshot => {
        dataArray.push(
          childSnapshot.val());
        labelArray.push(
          childSnapshot.key);
      });
      setData(dataArray);
      setLabels(labelArray);
      setLoading(false);
    };

    reference.on('value', onDataChange);

    // Cleanup subscription on unmount
    return () => reference.off('value', onDataChange);
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
  //const values=data.map(item=>item.value);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontWeight:'bold',fontSize:16}}>Temperatura promedio anual</Text>
        <LineChart
          data={{
            labels: ["Enero","Febrero","Marzo","Abril","Mayo"],
            //labels: labels,
            datasets: [
              {
                data:data
              }
            ]
          }}
          width={Dimensions.get('window').width - 16} // from react-native
          height={400}
          yAxisLabel=""
          yAxisSuffix="°"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#551A7C",
            backgroundGradientTo: "#143481",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: "6",
              strokeWidth: "4",
              stroke: "#CA3C2D"
            }
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
            stroke:"#FFFFFF"
          }}
        />
      </View>
  );
};

export default VistaGrafica;