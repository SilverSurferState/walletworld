import { View, StyleSheet, TouchableOpacity, Text, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

function SettingsScreen({navigation}) {

  async function clearAsyncStorage() {
    try {
      await AsyncStorage.clear();
      Alert.alert('AsyncStorage successfully cleared!')
    } catch (e) {
      Alert.alert('Failed to clear AsyncStorage: ', e);
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => clearAsyncStorage()}>
        <Text>Reset All</Text>
      </TouchableOpacity>
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 32,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 12,
    width: "80%",
    marginBottom: 16,
    fontSize: 18,
  },
  button: {
    backgroundColor: "#0080ff",
    borderRadius: 4,
    padding: 12,
    margin: 6
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default SettingsScreen;
