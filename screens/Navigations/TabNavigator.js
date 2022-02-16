import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import { MainStackNavigator, ContactStackNavigator } from "./StackNavigator";

const Tab = createBottomTabNavigator();

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

const BottomTabNavigator = () => {
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
      
      {/* <Tab.Screen name="Contact" component={ContactStackNavigator} /> */}
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;