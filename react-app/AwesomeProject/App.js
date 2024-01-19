import React from 'react';
import { View, Text, Button, Modal, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

// Ecran Home
const HomeScreen = ({ navigation }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Home Page</Text>
    <Button title="Go to Details" onPress={() => navigation.navigate('Details')} />
    <Button title="Go to About" onPress={() => navigation.navigate('About')} />
    <Button title="Open Modal" onPress={() => navigation.navigate('Modal')} />
  </View>
);

// Ecran Details
const DetailsScreen = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Details Page</Text>
  </View>
);

// Ecran About
const AboutScreen = () => (
  <View style={styles.container}>
    <Text style={styles.title}>About Page</Text>
  </View>
);

// Ecran Modal
const ModalScreen = ({ navigation }) => (
  <View style={styles.modalContainer}>
    <Text style={styles.modalText}>This is a Modal Screen</Text>
    <Button title="Close Modal" onPress={() => navigation.goBack()} />
  </View>
);

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Custom Home Page' }} />
    <Stack.Screen name="Details" component={DetailsScreen} options={{ title: 'Custom Details Page' }} />
    <Stack.Screen name="About" component={AboutScreen} options={{ title: 'Custom About Page' }} />
    <Stack.Screen name="Modal" component={ModalScreen} options={{ title: 'Modal' }} />
  </Stack.Navigator>
);

const TabsStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Tab1" component={DetailsScreen} options={{ title: 'Tab 1' }} />
    <Stack.Screen name="Tab2" component={DetailsScreen} options={{ title: 'Tab 2' }} />
    <Stack.Screen name="Tab3" component={DetailsScreen} options={{ title: 'Tab 3' }} />
  </Stack.Navigator>
);

const App = () => (
  <NavigationContainer>
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home1" component={HomeStack} />
      <Drawer.Screen name="Tabs" component={TabsStack} />
    </Drawer.Navigator>
  </NavigationContainer>
);

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold' },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000 },
  modalText: { fontSize: 24, fontWeight: 'bold', color: 'white' },
});

export default App;