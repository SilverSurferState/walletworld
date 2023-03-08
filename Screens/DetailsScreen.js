import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

function DetailsScreen({route}) {
  const {chartTitle, chartData} = route.params;
  return (
    <View style={styles.container}>
      <Text>{chartTitle}</Text>
     
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

export default DetailsScreen;
