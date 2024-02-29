import * as React from "react";

import { Button } from "react-native";
//import { Stack } from "../../App";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { DetailsScreen } from "./Details";
import { HomeScreen } from "./Home";
import { AboutScreen } from "./About";
import { ModalScreen } from "./Modal";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
export function BottomTabs() {
  const navigation = useNavigation();

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeBottom"
        component={HomeScreen}
        options={{
          tabBarLabel: "Mon Accueil",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="DetailsBottom"
        component={DetailsScreen}
        options={{
          tabBarLabel: "Mes Détails",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="details" color={color} size={size} />
          ),
          title: "Mes Détails",
          headerStyle: { backgroundColor: "#2aefff" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <Tab.Screen
        name="AboutBottom"
        component={AboutScreen}
        initialParams={{ description: "Default Description" }}
        options={{
          description: "On arrive depuis la page Home",
          tabBarLabel: "A Propos",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="information"
              color={color}
              size={size}
            />
          ),
          title: "A Propos",
          headerStyle: { backgroundColor: "#ff36ae" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />

      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Tab.Navigator>
  );
}