import * as React from "react";

import { Button } from "react-native";
//import { Stack } from "../../App";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();



export function StackScreen() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Group>
        <Stack.Screen name="Home" component={BottomTabs} />
        {/* <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="About" component={AboutScreen} /> */}
      </Stack.Group>
    </Stack.Navigator>
  );
}