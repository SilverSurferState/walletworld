import React, { useState, useEffect } from "react";
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
import MainScreen from "../Screens/MainScreen";
import { DATA, CONFIG } from "../Constants/constants"

export function LineChartCard(props) {
  const {chartId, getData } = props;
  console.log(chartId)
  const [title, setTitle] = useState("Enter expenses title");
  const navigation = useNavigation();
  const [chartDataState, setChartDataState] = useState(DATA);

  useEffect(() => {
    const getDataFromStorage = async () => {
      const data = await getData(chartId);
      setChartDataState(data)
    };
    getDataFromStorage();
  }, [chartId]);

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
            onPress={() =>
              navigation.navigate("Details", {
                chartData: chartDataState,
                chartTitle: title,
                id: chartId,
                getData: getData
              })
            }
          >
            <LineChart
              data={chartDataState}
              width={Dimensions.get("window").width - 100}
              height={220}
              chartConfig={CONFIG}
            />
          </TouchableOpacity>
        </View>
      </Card>
    </View>
  );
}

export function BarChartCard({ chartId }) {
  const [title, setTitle] = useState("Enter expenses title");
  const navigation = useNavigation();
  const [chartDataState, setChartDataState] = useState([]);

  useEffect(() => {
    const getDataFromStorage = async () => {
      const data = await getData(chartId);
      setChartDataState(data);
    };
    getDataFromStorage();
  }, [chartId]);

  const getData = async (chartId) => {
    const data = await props.getData(chartId);
    return data;
  };

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
            onPress={() =>
              navigation.navigate("Details", {
                chartData: chartDataState,
                chartTitle: title,
                id: chartId,
              })
            }
          >
            <BarChart
              data={chartDataState}
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

export function BezierChartCard({ chartId }) {
  const [title, setTitle] = useState("Enter expenses title");
  const navigation = useNavigation();
  const [chartDataState, setChartDataState] = useState([]);

  useEffect(() => {
    const getDataFromStorage = async () => {
      const data = await MainScreen.getData(chartId);
      setChartDataState(data);
    };
    getDataFromStorage();
  }, [chartId]);

  const getData = async (chartId) => {
    const data = await MainScreen.getData(chartId);
    return data;
  };

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
            onPress={() =>
              navigation.navigate("Details", {
                chartData: chartDataState,
                chartTitle: title,
                id: chartId,
              })
            }
          >
            <LineChart
              data={chartDataState.length > 0 ? (
                <LineChart
                  data={chartDataState}
                  width={Dimensions.get("window").width - 100}
                  height={220}
                  chartConfig={chartConfig}
                />
              ) : (
                <Text>No data available</Text>
              )}
              width={Dimensions.get("window").width - 100}
              height={220}
              chartConfig={chartConfig}
              bezier
            />
          </TouchableOpacity>
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 0,
    borderRadius: 10,
    borderWidth: 0,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginVertical: 10,
  },
  chartContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  titleInput: {
    fontSize: 20,
    fontWeight: "bold",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});

