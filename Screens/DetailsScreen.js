import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Dimensions, FlatList } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import ExpenseForm from "../components/ExpenseForm";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DetailScreen = () => {
  const [chartData, setChartData] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();
  const { chartTitle, id, getData } = route.params;

  useEffect(() => {
    const getDataFromStorage = async () => {
      const data = await getData(id);
      setChartData(data);
    };
    getDataFromStorage();
  }, []);

  const handleAddExpense = async (expense) => {
    setExpenses([...expenses, expense]);
    const storageKey = id;
    //create new chartData obj
    const chartData = {
      labels: expenses.map((expense) => expense.description),
      datasets: [
        {
          data: expenses.map((expense) => expense.amount),
          color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
        },
      ],
    };
    //pass to asyncStore    
    try {
      await AsyncStorage.setItem(storageKey, JSON.stringify(chartData));
    } catch(error) {
      console.log('Error saving', error)
    } 
  };

  const getDataAfter = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(id)
      return jsonValue != null ? JSON.parse(jsonValue) : null;
      
    } catch(e) {
      // error reading value
    }
  }

  return (
    <View style={styles.container}>
      <ExpenseForm onSubmit={handleAddExpense} chartId={id} />

      <FlatList
        data={expenses}
        renderItem={({ item }) => (
          <View style={styles.expense}>
            <Text style={styles.title}>{item.description}</Text>
            <Text style={styles.amount}>{item.amount}€</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};







const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default DetailScreen;
