import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";

import  DrawerContent  from "../../components/DrawerContent";
import TabNavigator from "./TabNavigator";

const Drawer = createDrawerNavigator();
const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#9AC4F8",
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
  headerBackTitleVisible: false,
          headerLeft: Platform.select({
            ios: null,
          }),
          headerTitleStyle: {
            color: "#ffffff",
          },
          headerShown: Platform.select({
            ios: false,
            android: false,
          }),
};


const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
     screenOptions={screenOptionStyle}
     drawerContent = {props=> <DrawerContent {...props}/>}
    >
      <Drawer.Screen name="GotoNav" component={TabNavigator} />
      
      {/* <Drawer.Screen name="Contact" component={ContactStackNavigator} /> */}
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;