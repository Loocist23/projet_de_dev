import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StackScreen } from "./components/navigation/StackScreen";
import { BottomTabs } from "./components/navigation/BottomTabs";
import { DrawerNavigation } from "./components/navigation/DrawerNavigation.jsx";

function App() {
  return (
    <NavigationContainer>
      {/* <StackScreen /> */}
      {/* <BottomTabs /> */}
      <DrawerNavigation />
    </NavigationContainer>
  );
}

export default App;