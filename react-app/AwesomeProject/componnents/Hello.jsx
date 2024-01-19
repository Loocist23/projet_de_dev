import React from "react";
import { Text, View, StyleSheet } from "react-native";
 
const Hello = ({ person, children }) => {
  const { name, age, birthPlace } = person;
 
  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Bonjour à tous !</Text>
 
      <View style={styles.players}>
        <View style={styles.test}>
          <View style={styles.row}>
            <Text style={styles.label}>Je suis </Text>
            <Text style={styles.value}>{name}</Text>
          </View>
          <View style={styles.row1}>
            <Text style={styles.label}>J'ai</Text>
            <Text style={styles.value}>{age} ans</Text>
          </View>
        </View>
 
        <View style={styles.test1}>
          <Text style={styles.label}>Né à</Text>
          <Text style={styles.value}>{birthPlace}</Text>
        </View>
 
        <View style={styles.test2}>
          <Text style={styles.descriptionLabel}>Description</Text>
          <View style={styles.description}>
            <Text>{children}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
 
const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    width: "100%",
    margin:10,
  },
  greeting: {
    fontSize: 22,
    fontWeight: "bold",
    color: "orange",
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
  },
  row1: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  row2: {
    flexDirection: "row",
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
  },
  value: {
    fontSize: 18,
  },
  descriptionLabel: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    borderLeftWidth: 2,
    borderLeftColor: "lightgrey",
  },
  test: {
    backgroundColor: "#4682b4",
    justifyContent: "center",
    borderWidth: 1,
    flex: 0.25,
  },
  test1: {
    backgroundColor: "#87ceeb",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    flexDirection: "row",
    flex: 0.35,
  },
  test2: {
    backgroundColor: "#afe0e6",
    justifyContent: "center",
    borderWidth: 1,
    flex: 0.5,
  },
  players: {
    flex: 1,
    height: 300,
  },
});
 
/*class Hello extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
 
    render() {
        const { person, children } = this.props;
        const { name, age, birthPlace } = person;
 
        return (
            <View>
                <Text>Hello {name}, tu as {age} ans et tu es né à {birthPlace}.</Text>
                <Text>{children}</Text>
            </View>
        );
    }
}*/
 
export default Hello;