import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Modal,
  TextInput,
  Dimensions,
  StyleSheet,
} from "react-native";
import { PieChart } from "react-native-chart-kit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { chartConfig } from "../Constants/constants";
import Dropdown from "./DropDown";
import randomcolor from 'randomcolor';

const Chart = ({ chartData, chartIndex }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [expenseName, setExpenseName] = useState("");
  const [expenseValue, setExpenseValue] = useState(0);
  const [data, setExpenseData] = useState([]);
  const [dropDownValue, setDropDownValue] = useState(null);
  

  console.log("in chart:")
  console.log(data)

  const getColorByType = () => {
    switch (dropDownValue) {
      case "Food":
        return "red";
        break;
      case "Housing/Rent":
        return "blue";
        break;
      case "Clothing":
        return "orange";
        break;
      default: randomcolor({exclude: ['red', 'blue', 'orange']})
    }
  };

 

  const basicExpense = {
    name : "",
    amount : 0,
    color : 'blue'
  }

  const handleValueChange = (value) => {
    setDropDownValue(value);
  };
  useEffect(() => {
    getChartInfo();
    console.log("fetched")
    console.log(data.length)
    if (data.length == 0){
      setExpenseData(data => [...data, basicExpense])
    } else {
      setChartInfo();
      console.log("set")
    }
    
  }, []);

  const getChartInfo = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(`chart-${chartIndex}`);
      if (jsonValue !== null) {
        let fetchedValue = {...JSON.parse(jsonValue)}
        console.log(fetchedValue)
        if (data !== fetchedValue) 
        {setExpenseData(JSON.parse(jsonValue));}
      }
    } catch (e) {
      console.log(e);
    }
  };

 

  const setChartInfo = () => {
    const newExpense = {
      name: expenseName,
      amount: expenseValue.toString(),
      color: getColorByType(),
    };
    setExpenseData(data => [...data, newExpense])
    setExpenseData((data) => data.filter(e => e.name !== ""))
    AsyncStorage.setItem(`chart-${chartIndex}`, JSON.stringify(data));

    setModalVisible(false);
    setExpenseName("");
    setExpenseValue("");
  };

  const handleModalClose = () => {
    // Update the chart data and save it to AsyncStorage
    setModalVisible(false);
  };
  console.log(data)
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{chartData.name}</Text>
        <TouchableOpacity onPress={() => onDeleteChart(chartIndex)}>
          <Text style={styles.headerButton}>Delete</Text>
        </TouchableOpacity>
      </View>
      {(
        <>
          <PieChart
            data={data}
            width={Dimensions.get("window").width - 16}
            height={220}
            chartConfig={chartConfig}
            hasLegend={false}
            accessor="amount"
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
            backgroundColor="transparent"
            paddingLeft={15}
            center={[10, 0]}
            absolute
          />
          <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View style={styles.expenseListItem}>
                <Text style={styles.leftText}>{item.name}</Text>
                <Text style={styles.rightText}>€{item.amount}</Text>
              </View>
            )}
          />
        </>
      )}
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text style={styles.addButton}>Add Expense</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={handleModalClose}
      >
        <View style={styles.modalContainer}>
          <View>
            <TextInput
              style={styles.modalInput}
              value={expenseName}
              onChangeText={setExpenseName}
              placeholder="Enter expense name"
            />
          </View>
          <View>
            <TextInput
              style={styles.modalInput}
              value={expenseValue.toString()}
              onChangeText={setExpenseValue}
              placeholder="Enter expense amount"
              keyboardType="numeric"
            />
          </View>
          <View>
            <Dropdown onValueChange={handleValueChange} />
          </View>
          <TouchableOpacity style={styles.modalButton} onPress={setChartInfo}>
            <Text style={styles.modalButtonText}>Add Expense</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.modalButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F4F7",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  leftText: {
    flex: 1,
    fontWeight: 'bold',
  },
  rightText: {
    flex: 1,
    textAlign: 'right',
    fontWeight: 'bold',
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4F4F4F",
  },
  headerButton: {
    color: "#4F4F4F",
    fontSize: 16,
  },
  listItemText: {
    color: "#4F4F4F",
    fontSize: 18,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: "#2D9CDB",
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
    padding: 10,
    borderRadius: 5,
    textAlign: "center",
    marginTop: 20,
  },
  expenseListItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
    marginVertical: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: 'stretch',
    backgroundColor: "#F5FCFF",
    padding: 20,
  },
  modalInput: {
    height: 40,
    width: Dimensions.get("window").width - 50,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
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

export default Chart;
