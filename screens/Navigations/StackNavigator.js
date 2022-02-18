import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider, useSelector } from "react-redux";
import { store } from "../../redux/store";
import Home from "../MainScreens/Home";
import Shop from "../MainScreens/Shop";
import Member from "../MainScreens/Member";
import Account from "../MainScreens/Account";
import Payment from "../MainScreens/Payment";
const Stack = createStackNavigator();
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

const MainStackNavigator = () => {
  return (
    <Stack.Navigator
        screenOptions={screenOptionStyle}
    
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Payment" component={Payment} />
      <Stack.Screen name="Member" component={Member} />
      <Stack.Screen name="Account" component={Account} />
    </Stack.Navigator>
  );
}


const ShopStackNavigator = () => {
  return (
    <Stack.Navigator
        screenOptions={screenOptionStyle}
    
    >
      <Stack.Screen name="Shop" component={Shop} />
      <Stack.Screen name="Payment" component={Payment} />
      <Stack.Screen name="Member" component={Member} />
      <Stack.Screen name="Account" component={Account} />
    </Stack.Navigator>
  );
}


const PaymentStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Contact" component={Payment} />
    </Stack.Navigator>
  );
}

export { MainStackNavigator,PaymentStackNavigator,ShopStackNavigator };