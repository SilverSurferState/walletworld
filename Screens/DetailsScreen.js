import React, {useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Chart from '../components/Chart';
import AsyncStorage from "@react-native-async-storage/async-storage";


const DetailScreen = ({ route }) => {
  const { chartIndex, data } = route.params;
  const chartData = data[chartIndex];

  return (
    <View style={styles.container}>
      <Chart
        chartData={chartData.data}
        chartIndex={chartIndex}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  deleteButton: {
    backgroundColor: '#FF6347',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 20,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default DetailScreen;