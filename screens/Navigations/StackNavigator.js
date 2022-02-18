import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider, useSelector } from "react-redux";
import { store } from "../../redux/store";
import Home from "../MainScreens/Home";
import Shop from "../MainScreens/Shop";
import AddStock from "../MainScreens/AddStock";
import MemberPayment from "../MainScreens/AddNewMemberPayment";
import AddNewMember from "../MainScreens/AddMember";
import Account from "../MainScreens/Account";
import Payment from "../MainScreens/AddNewMemberPayment";
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
      <Stack.Screen name="MemberPayment" component={Payment} />
      <Stack.Screen name="AddNewMember" component={AddNewMember} />
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
      <Stack.Screen name="AddStock" component={AddStock} />
      {/* <Stack.Screen name="Member" component={Member} /> */}
      {/* <Stack.Screen name="Account" component={Account} /> */}
    </Stack.Navigator>
  );
}

const AccountStackNavigator = () => {
  return (
    <Stack.Navigator
        screenOptions={screenOptionStyle}
    
    >
      <Stack.Screen name="Account" component={Account} />
      <Stack.Screen name="Shop" component={Shop} />
      <Stack.Screen name="AddStock" component={AddStock} />
      <Stack.Screen name="Member" component={MemberPayment} />
     
    </Stack.Navigator>
  );
}

const PaymentStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Payment" component={Payment} />
    </Stack.Navigator>
  );
}

export { MainStackNavigator,PaymentStackNavigator,ShopStackNavigator,AccountStackNavigator };