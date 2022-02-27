import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../MainScreens/Home";
import Shop from "../MainScreens/Shop";
import AddStock from "../MainScreens/AddStock";
import MemberPayment from "../MainScreens/AddNewMemberPayment";
import AddNewMember from "../MainScreens/AddMember";
import Account from "../MainScreens/Account";
import EditProfile from "../MainScreens/EditProfile";
import Wallet from "../MainScreens/Withdrawal";
import WithdrawRequest from "../MainScreens/SubmitWithdrawRequest";
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
      <Stack.Screen name="WithdrawalRequestF" component={WithdrawRequest} />
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
      
    </Stack.Navigator>
  );
}

const AccountStackNavigator = () => {
  return (
    <Stack.Navigator
        screenOptions={screenOptionStyle}
    
    >
      <Stack.Screen name="AccountStack" component={Account} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="Wallet" component={Wallet} />
      <Stack.Screen name="TabNagivateToWithrawal" component={Shop} />
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