import { View, StyleSheet, TouchableOpacity, Text, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useState } from "react";
import realm from "../Data/realm";
import { LineChartCard, BarChartCard, BezierChartCard } from '../components/ChartCard';

const chartData = {
  labels: [],
  datasets: [
    {
      data: [],
      color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
      strokeWidth: 2,
    },
  ],
};

function MainScreen({ navigation }) {
  const [cards, setCards] = useState([]);

  const addCard = () => {
    const id = new Date().toISOString();
    const type = "line";
    const data = JSON.stringify(chartData);
  
    // realm.write(() => {
    //   realm.create("Card", {
    //     id,
    //     type,
    //     data,
    //   });
    // });
  
    setCards([...cards, { id, type, data }]);
  };

  const removeCard = () => {
    if (cards.length > 0) {
      setCards(cards.slice(0, cards.length - 1));
    }
  };

  const renderCard = (card) => {
    switch (card.type) {
      case "line":
        return <LineChartCard key={card.id} data={JSON.parse(card.data)} />;
      case "bar":
        return <BarChartCard key={card.id} data={JSON.parse(card.data)} />;
      case "bezier":
        return <BezierChartCard key={card.id} data={JSON.parse(card.data)} />;
      default:
        return null;
    }
  };


  return (
    <View style={styles.viewcontainer}> 
    <View style={styles.buttonSet}>
      <TouchableOpacity  onPress={addCard} name='add'>
        <View style={styles.button}>
          <Icon name="plus" type="font-awesome-5" size={20}/></View>
      </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
          <View style={[styles.button]}>
            <Icon name="gears" size={20}></Icon>
          </View>
        </TouchableOpacity>
      </View>
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
    {cards.map((card) => renderCard(card))}
    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollcontainer: {
    padding: 10,
  },
  viewcontainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10
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
    backgroundColor: "#6699CC",
    borderRadius: 10,
    padding: 12,
    margin: 6,
  },
  buttonSet: {
    top: 5,
    flexDirection: 'row',
    paddingBottom: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default MainScreen;
