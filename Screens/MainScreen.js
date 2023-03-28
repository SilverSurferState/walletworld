import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  ImageBackground,
  Alert
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DATA } from '../Constants/constants';
import { Ionicons } from '@expo/vector-icons';

const MainScreen = ({ navigation }) => {
  const [charts, setCharts] = useState(DATA);
  const [modalVisible, setModalVisible] = useState(false);
  const [newChartName, setNewChartName] = useState("");
  const [newChartBudget, setNewChartBudget] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  
  

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("charts");
      if (jsonValue !== null) {
        setCharts(JSON.parse(jsonValue));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("charts", jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  const handleAddChart = () => {
    if (newChartName && newChartBudget) {
      setModalVisible(false);
      const newChart = {
        name: newChartName,
        data: [{}],
        budget: newChartBudget,
      };
      setCharts([...charts, newChart]);
      storeData([...charts, newChart]);
      setNewChartName("");
      setNewChartBudget("");
    } else {
      Alert.alert("Error", "Please enter chart name and budget");
    }
  };

  return (
    <ImageBackground source={require('../assets/ww.png')} style={styles.background}>
      <View style={styles.container}>
        <FlatList
          data={charts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => navigation.navigate("Details", { chartIndex: index, data: charts})}
            >
              <Text style={{fontWeight: 'bold', textAlign: 'center', fontSize: 20, color: 'white'}}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
        <TouchableOpacity
          style={[styles.floatingButton, isExpanded && styles.floatingButtonExpanded]}
          onPress={() => setIsExpanded(!isExpanded)}
        >
          <Ionicons name="menu" size={30} color="white" />
        </TouchableOpacity>
        {isExpanded && (
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
              <Ionicons name="stats-chart" size={30} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate("Settings")}>
              <Ionicons name="settings" size={30} color="white" />
            </TouchableOpacity>
          </View>
        )}
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <TextInput
              style={styles.modalInput}
              onChangeText={setNewChartName}
              value={newChartName}
              placeholder="Enter chart name"
            />
            <TextInput
              style={styles.modalInput}
              onChangeText={setNewChartBudget}
              value={newChartBudget}
              placeholder="Enter budget"
            />
            <TouchableOpacity style={styles.modalButton} onPress={handleAddChart}>
              <Text style={styles.modalButtonText}>Add Chart</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </ImageBackground>
  )};
  

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: "transparent",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    alignSelf: "stretch",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  addButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  listContainer: {
    flex: 1,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 10,
  },
  listItemText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  chartContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    padding: 5,
    marginTop: 5,
    backgroundColor: '#7393B3',
    borderRadius: 50,
    height: 60,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatingButtonExpanded: {
    height: 60,
    width: 60,
    borderRadius: 60,
  },
  buttonsContainer: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#7393B3',
    borderRadius: 50,
    height: 60,
    width: 60,
    padding: 5,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatingButtonText: {
    color: "#fff",
    fontSize: 30,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    padding: 20,
  },
  modalInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    alignSelf: "stretch",
    marginBottom: 20,
    padding: 10,
  },
  modalButton: {
    backgroundColor: "#7393B3",
    padding: 10,
    borderRadius: 5,
    alignSelf: "stretch",
    marginBottom: 10,
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default MainScreen;
