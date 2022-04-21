import React from "react";
import { View, Text,Platform } from 'react-native';

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
// import { MainStackNavigator, PaymentStackNavigator,ShopStackNavigator,AccountStackNavigator } from "./StackNavigator";
import MemberPayment from "../../MainScreens/AddNewMemberPayment";
import AddMember from "../../MainScreens/AddMember";
import ViewMore from "../../MainScreens/ViewMore";
import Withdrawal from "../../MainScreens/Withdrawal";
import WithdrawalRequest from "../../MainScreens/SubmitWithdrawRequest";

import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const screenOptionStyle = {
  // headerStyle: {
  //   backgroundColor: "#9AC4F8",
  // },
  // activeTintColor: "#01cf13",
  //       inactiveTintColor: "#c7c7c7",
  // headerTintColor: "white",
  // headerBackTitle: "Back",
  // headerBackTitleVisible: false,
          // headerLeft: Platform.select({
          //   ios: null,
          // }),
          // headerTitleStyle: {
          //   color: "#ffffff",
          // },
          // headerShown: Platform.select({
          //   ios: false,
          //   android: false,
          // }),
};









function WithdrawalStart() {
  return (
    <Stack.Navigator
    screenOptions={{
          title: null,
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
            // backgroundColor: "",
          },
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
        }}
    
    >
      <Stack.Screen name="WithdrawalTap" component={Withdrawal} />
      <Stack.Screen name="WithDrawalStackStart" component={WithdrawalRequest} />
      <Stack.Screen name="ViewMore" component={ViewMore} />
      <Stack.Screen name="WithdrawRequest" component={WithdrawalRequest} />
      <Stack.Screen name="MemberPayment" options={{ headerShown: false }} component={MemberPayment} />
      
    </Stack.Navigator>
  );
}
export default WithdrawalStart;