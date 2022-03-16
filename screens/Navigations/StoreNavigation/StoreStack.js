import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Products from "../../StoreScreen/Products";
import Stores from "../../StoreScreen/Stores";
import { Provider, useSelector } from "react-redux";
import Register from "../../StoreScreen/Register";
import Login from "../../StoreScreen/Login";
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

const StoreStack = () => {
  const { loginStatus, showSplash,gtpsUserData } = useSelector((state) => state.reducers);

  console.log("myLoginStatusStore",gtpsUserData);
  return (
    <Stack.Navigator
        screenOptions={screenOptionStyle}
    
    >
      <Stack.Screen name="Products" component={Products} />
      
      <Stack.Screen name="Stores" component={Stores} />
        <>
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="SignIn" component={Login} />
        </>
      
    </Stack.Navigator>
  );
}



export default StoreStack ;