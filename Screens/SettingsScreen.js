import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
  ImageBackground,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

function SettingsScreen({ navigation }) {
  async function clearAsyncStorage() {
    try {
      await AsyncStorage.clear();
      Alert.alert(
        "AsyncStorage successfully cleared! However, you need to reload the app for the changes to take effect."
      );
    } catch (e) {
      Alert.alert("Failed to clear AsyncStorage: ", e);
    }
  }

  return <>
    <ImageBackground
      source={require("../assets/lxrcbsv-vVHXeu0YNbk-unsplash.jpg")}
      style={styles.background}
    >
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => clearAsyncStorage()}
        >
          <Text>Reset All</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
    </>
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#transparent",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 32,
  },
  button: {
    backgroundColor: "#2D9CDB",
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
    padding: 10,
    borderRadius: 5,
    textAlign: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default SettingsScreen;
