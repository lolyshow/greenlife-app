import React from "react";
import { View, Text,Platform } from 'react-native';

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import { MainStackNavigator, ContactStackNavigator,ShopStackNavigator } from "./StackNavigator";
import { NavigationContainer } from '@react-navigation/native';
import Home from "../MainScreens/Home";
import MemberPayment from "../MainScreens/AddNewMemberPayment";
import AddMember from "../MainScreens/AddMember";
import CommissionReport from "../MainScreens/CommissionReport";
import Withdrawal from "../MainScreens/Withdrawal";
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

const HomeTabs = () => {
  return (
    <Tab.Navigator
    screenOptions={({ route })=>({
      tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "History") {
            iconName = focused ? "timer" : "timer-outline";
          } else if (route.name === "Notification") {
            iconName = focused ? "notifications" : "notifications-outline";
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
      <Tab.Screen name="Home" options={{ headerLeft: null, gesturesEnabled: false, headerShown: false }} component={MainStackNavigator} />
      <Tab.Screen name="Shop" options={{/*tabBarStyle:{display:'none'},*/ /*showLabel: false,*/ /*headerLeft: null,*/ /*tabBarVisible: false,*/ /*gesturesEnabled: false,*/ headerShown: false }} component={ShopStackNavigator} />
      <Tab.Screen name="Profile" options={{tabBarStyle:{display:'none'}, showLabel: false, headerLeft: null, tabBarVisible: false, gesturesEnabled: false, headerShown: false }} component={MainStackNavigator} />
      {/* <Tab.Screen name="Contact" component={ContactStackNavigator} /> */}
    </Tab.Navigator>
  );
};

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Contact" component={Payment} />
    </Stack.Navigator>
  );
}

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
      <Stack.Screen name="Home" component={HomeTabs} />
      <Stack.Screen name="Prof" component={Home} />
      <Stack.Screen name="MemberPayment" component={MemberPayment} />
      <Stack.Screen name = "AddMember" component = {AddMember}/>
      <Stack.Screen name = "CommissionReport" component = {CommissionReport}/>
      <Stack.Screen name = "Withdrawal" component = {Withdrawal}/>
      <Stack.Screen name = "SubmitWithdrawRequest" component = {SubmitWithdrawRequest} />
    </Stack.Navigator>
  );
}
export default BottomTabNavigator;