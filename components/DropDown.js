import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import randomColor from 'randomcolor';

export default function Dropdown ({ onValueChange }) {
  const [selectedValue, setSelectedValue] = useState(null);
  const [newOption, setNewOption] = useState('');
  const [options, setOptions] = useState([
    { name: 'Food', color: 'red' },
    { name: 'Housing/Rent', color: 'blue' },
    { name: 'Clothing', color: 'green' },
    { name: 'Fun', color: 'orange' },
    { name: 'Energy', color: 'teal' },
    { name: 'Car', color: 'navy' },
    { name: 'Water', color: 'grey' },
    { name: 'Pets', color: 'yellow' },
    { name: 'Dates', color: 'black' },
  ]);

  const addOption = () => {
    if (newOption !== '') {
      const newOptions = [...options];
      newOptions.push({ name: newOption, color: getRandomColor() });
      setOptions(newOptions);
      setSelectedValue(newOption);
      onValueChange({ name: newOption, color: getRandomColor() });
      setNewOption('');
    }
  };

  const handleValueChange = (value) => {
    const option = options.find((option) => option.name === value);
    setSelectedValue(value);
    onValueChange(option);
  };

  const getRandomColor = () => {
    const colors = ['red', 'green', 'blue', 'orange', 'teal', 'navy', 'grey', 'yellow', 'black'];
    return randomColor({exclude: colors})
  };

  return (
    <View style={{ width: Dimensions.get("window").width - 50, backgroundColor: 'white', borderWidth: 1, borderRadius: 5, borderColor: '#ccc', marginBottom: 10, padding: 10}}>
      <SelectDropdown
        data={options.map((option) => option.name)}
        onSelect={handleValueChange}
        defaultValue={selectedValue}
        buttonTextAfterSelection={(selectedItem) => {
          return selectedItem;
        }}
        rowTextForSelection={(item) => {
          return item;
        }}
        buttonStyle={{ height: 40, backgroundColor: '#7393B3', paddingHorizontal: 10, margin: 10, borderColor: '#ccc', borderWidth: 1, borderRadius: 5}}
        buttonTextStyle={{ color: '#000' }}
        dropdownStyle={{ backgroundColor: '#fafafa', borderWidth: 1, borderRadius: 5, borderColor: '#ccc' }}
      />
      <View style={{ flexDirection: 'row' }}>
        <TextInput
          style={{ flex: 1, height: 40, borderWidth: 1, borderRadius: 5, borderColor: '#ccc', marginRight: 10, paddingHorizontal: 10 }}
          value={newOption}
          onChangeText={(text) => setNewOption(text)}
          placeholder="Enter new option"
        />
        <TouchableOpacity onPress={addOption}>
          <Text style={{ padding: 10, backgroundColor: '#7393B3', borderRadius: 5, color: 'white' }}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};