import React, { createContext, useState, useContext } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UUID } from '../Data/IdGenerator';

export const ExpenseContext = createContext({
  expenses: [],
  addExpense: () => {},
});

const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);

  const addExpense = async (newExpense) => {
    try {
      const storedExpenses = await AsyncStorage.getItem(newExpense.chartId);
      if (storedExpenses) {
        const parsedExpenses = JSON.parse(storedExpenses);
        parsedExpenses.push(newExpense);
        await AsyncStorage.setItem(newExpense.chartId, JSON.stringify(parsedExpenses));
      } else {
        await AsyncStorage.setItem(newExpense.chartId, JSON.stringify([newExpense]));
      }
      setExpenses([...expenses, newExpense]);
    } catch (e) {
      console.log(e); // handle error here
    }
  };

  return (
    <ExpenseContext.Provider value={{ expenses, addExpense }}>
      {children}
    </ExpenseContext.Provider>
  );
};

const ExpenseForm = ({ chartId }) => {
  const { addExpense } = useContext(ExpenseContext);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  
  const handleSubmit = () => {
    const newExpense = {
      id: UUID, 
      date: new Date(),
      amount: parseFloat(amount),
      description: description,
      chartId: chartId,
    };
    setDescription('');
    setAmount('');
    addExpense(newExpense);
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter expense description"
      />

      <Text style={styles.label}>Amount</Text>
      <TextInput
        style={styles.input}
        value={amount}
        onChangeText={setAmount}
        placeholder="Enter expense amount"
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Add Expense</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default ExpenseForm;
