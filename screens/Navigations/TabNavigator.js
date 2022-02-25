import React from "react";
import { View, Text,Platform } from 'react-native';

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import { MainStackNavigator, PaymentStackNavigator,ShopStackNavigator,AccountStackNavigator } from "./StackNavigator";
import MemberPayment from "../MainScreens/AddNewMemberPayment";
import AddMember from "../MainScreens/AddMember";
import CommissionReport from "../MainScreens/CommissionReport";
import Withdrawal from "../MainScreens/Withdrawal";
import Account from "../MainScreens/Account";
import MemberTeamPerformance from "../MainScreens/MemberTeamPerformance";
import SubmitWithdrawRequest from "../MainScreens/SubmitWithdrawRequest";
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



const AccountTabs = () => {
  return (
    <Tab.Navigator
    screenOptions={({ route })=>({
      tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "HomeTab") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "ShopTab") {
            iconName = focused ? "md-basket" : "md-basket-outline";
          } else if (route.name === "Withdrawal") {
            iconName = focused ? "ios-wallet-sharp" : "ios-wallet-outline";
          } else if (route.name === "Account") {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
          } else if (route.name === "POS") {
            iconName = focused ? "calculator" : "calculator-outline";
          }

          return <Icon name={iconName} size={size} color={color} />;
        }
        
          
          

    })}
    

    
    >
      <Tab.Screen name="Account" options={{/*tabBarStyle:{display:'none'}, /*showLabel: false,*/ /*headerLeft: null,*/ /*tabBarVisible: false,*/ /*gesturesEnabled: false,*/ headerShown: false }} component={ShopStackNavigator} />
      <Tab.Screen name="HomeTab" options={{ headerLeft: null, gesturesEnabled: false, headerShown: false }} component={MainStackNavigator} />
      <Tab.Screen name="ShopTab" options={{/*tabBarStyle:{display:'none'}, /*showLabel: false,*/ /*headerLeft: null,*/ /*tabBarVisible: false,*/ /*gesturesEnabled: false,*/ headerShown: false }} component={ShopStackNavigator} />
      <Tab.Screen name="Withdrawal" options={{/*tabBarStyle:{display:'none'}, /*showLabel: false,*/ /*headerLeft: null,*/ /*tabBarVisible: false,*/ /*gesturesEnabled: false,*/ headerShown: false }} component={ShopStackNavigator} />
      
    </Tab.Navigator>
  );
};







const HomeTabs = () => {
  return (
    <Tab.Navigator
    screenOptions={({ route })=>({
      tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "HomeTab") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "ShopTab") {
            iconName = focused ? "md-basket" : "md-basket-outline";
          } else if (route.name === "Withdrawal") {
            iconName = focused ? "ios-wallet-sharp" : "ios-wallet-outline";
          } else if (route.name === "Account") {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
          } else if (route.name === "POS") {
            iconName = focused ? "calculator" : "calculator-outline";
          }
          return <Icon name={iconName} size={size} color={color} />;
        }
    })}
    >
      <Tab.Screen name="HomeTab" options={{ headerLeft: null, gesturesEnabled: false, headerShown: false }} component={MainStackNavigator} />
      {/* <Stack.Screen name="MemberPayment" options={{ headerShown: false }} component={MemberPayment} /> */}
      <Tab.Screen name="ShopTab" options={{/*tabBarStyle:{display:'none'}, /*showLabel: false,*/ /*headerLeft: null,*/ /*tabBarVisible: false,*/ /*gesturesEnabled: false,*/ headerShown: false }} component={ShopStackNavigator} />
      <Tab.Screen name="Withdrawal" options={{ headerShown: false }} component={Withdrawal} />
      <Tab.Screen name="Account" options={{ headerShown: false }} component={AccountStackNavigator} />
      <Tab.Screen name="Member" options={{ headerShown: false }} component={MemberTeamPerformance} />

      {/* Withdrawal */}
    </Tab.Navigator>
  );
};

function BottomTabNavigator() {
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
      <Stack.Screen name="HomeStack" component={HomeTabs} />
      <Stack.Screen name="Prof" component={HomeTabs} />
      <Stack.Screen name="MemberPayment" options={{ headerShown: false }} component={MemberPayment} />
      <Stack.Screen name="ShopStack" component={ShopStackNavigator} />
      <Stack.Screen name = "AddMember" component = {AddMember}/>
      <Stack.Screen name = "CommissionReport" component = {CommissionReport}/>
      <Stack.Screen name = "AccountStackWithBottom" component = {Account}/>
      <Stack.Screen name = "Withdrawal" component = {Withdrawal}/>
      <Stack.Screen name = "SubmitWithdrawRequest" component = {SubmitWithdrawRequest} />
    </Stack.Navigator>
  );
}
export default BottomTabNavigator;