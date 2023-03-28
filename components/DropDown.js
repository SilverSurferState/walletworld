import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';

export default function Dropdown ({ onValueChange }) {
  const [selectedValue, setSelectedValue] = useState(null);
  const [newOption, setNewOption] = useState('');
  const [options, setOptions] = useState([
    'Food',
    'Housing/Rent',
    'Clothing',
  ]);

  const addOption = () => {
    if (newOption !== '') {
      const newOptions = [...options];
      newOptions.push(newOption);
      setOptions(newOptions);
      setSelectedValue(newOption);
      setNewOption('');
    }
  };

  const handleValueChange = (value) => {
    setSelectedValue(value);
    onValueChange(value);
  };

  return (
    <View style={{ width: Dimensions.get("window").width - 50, backgroundColor: 'white', borderWidth: 1, borderRadius: 5, borderColor: '#ccc', marginBottom: 10, padding: 10}}>
      <SelectDropdown
        data={options}
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
