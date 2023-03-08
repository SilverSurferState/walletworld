import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { LineChart, BarChart } from "react-native-chart-kit";
import { Card, Text } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

const chartData = {
  labels: [],
  datasets: [
    {
      data: [0],
      color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
      strokeWidth: 2,
    },
  ],
};

const chartConfig = {
  backgroundGradientFrom: "#fff",
  backgroundGradientTo: "#fff",
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
};

export function LineChartCard() {
  const [title, setTitle] = useState("Enter expenses title");
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1 }}>
      <Card containerStyle={styles.card}>
        <TextInput
          style={styles.titleInput}
          value={title}
          onChangeText={(text) => setTitle(text)}
        />

        <Card.Divider />
        <View style={styles.chartContainer}>
		<TouchableOpacity
            onPress={() => navigation.navigate("Details", {
              chartData: chartData,
              chartTitle: title,
            })}
          >
            <LineChart
              data={chartData}
              width={Dimensions.get("window").width - 100}
              height={220}
              chartConfig={chartConfig}
            />
          </TouchableOpacity>
        </View>
      </Card>
    </View>
  );
}

export function BarChartCard() {
  const [title, setTitle] = useState("Enter expenses title");
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1 }}>
      <Card containerStyle={styles.card}>
        <TextInput
          style={styles.titleInput}
          value={title}
          onChangeText={(text) => setTitle(text)}
        />

        <Card.Divider />
        <View style={styles.chartContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Details", {
              chartData: chartData,
              chartTitle: title,
            })}
          >
            <BarChart
              data={chartData}
              width={Dimensions.get("window").width - 100}
              height={220}
              chartConfig={chartConfig}
            />
          </TouchableOpacity>
        </View>
      </Card>
    </View>
  );
}

export function BezierChartCard() {
  const [title, setTitle] = useState("Enter expenses title");
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1 }}>
      <Card containerStyle={styles.card}>
        <TextInput
          style={styles.titleInput}
          value={title}
          onChangeText={(text) => setTitle(text)}
        />

        <Card.Divider />
        <View style={styles.chartContainer}>
		<TouchableOpacity
            onPress={() => navigation.navigate("Details", {
              chartData: chartData,
              chartTitle: title,
            })}
          >
            <LineChart
              data={chartData}
              width={Dimensions.get("window").width - 100}
              height={220}
              chartConfig={chartConfig}
            />
          </TouchableOpacity>
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    elevation: 5,
  },
  titleInput: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  chartContainer: {
    marginHorizontal: 5,
    marginTop: 10,
    width: Dimensions.get("window").width - 100,
  },
});
