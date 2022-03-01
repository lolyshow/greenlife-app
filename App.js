import React, {Component,useState} from 'react';
import { View, Text,Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from "./screens/Auth/Splash";
import StartScreen from "./screens/Auth/Start";
import NextScreen from "./screens/Auth/NextScreen";
import SignUp from "./screens/Auth/SignUp";
import Login from "./screens/Auth/Login";
import ForgotPassword from "./screens/Auth/ForgotPassword";
import EmailVerify from "./screens/Auth/EmailVerify";
import GtpsLogin from "./screens/Auth/GtpsLogin";

import Home from "./screens/MainScreens/Home";
import BottomTabNavigator from "./screens/Navigations/TabNavigator";
import DrawerNavigator from "./screens/Navigations/DrawerNavigator";
import { Provider, useSelector } from "react-redux";
import { store } from "./redux/store";
import AsyncStorage from '@react-native-async-storage/async-storage';

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

export default App = () => {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
};

const Stack = createNativeStackNavigator();

function AppContainer() {

  const [appReady,setAppReady] = useState(false)
  const [storedCredentials,setStoredCredentials] = useState("")
  const { loginStatus, showSplash } = useSelector((state) => state.reducers);
  const checkLoginCredential =()=>{
    AsyncStorage
    .getItem("userData")
    .then((result)=>{
      if(result !==null){
      setStoredCredentials(result);
      }else{
        setStoredCredentials(null);
      }
    })
    .catch(error=>{console.log("errorDetails",error)})
  }

  return (
    <NavigationContainer>
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

        {!loginStatus ? (
          <>
          {showSplash && (
            <Stack.Screen name="Splash" component={SplashScreen} />
            )}
            <Stack.Screen name="Start" component={StartScreen} options={{ headerLeft: null, gesturesEnabled: false }}/>
            <Stack.Screen name="NextScreen" component={NextScreen} />
            
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="EmailVerify" component={EmailVerify} />
            <Stack.Screen name="GtpsLogin" component={GtpsLogin} />
          </>
         ) : (
          <>
            <Stack.Screen name="GotoHomeStack" component={DrawerNavigator}  options={{ headerLeft: null, gesturesEnabled: false, headerShown: false }}/>
            {/* <Stack.Screen name="Profile" component={DrawerNavigator}  options={{ headerLeft: null, gesturesEnabled: false, headerShown: false }}/> */}
          </>
        )} 
        {/* NextScreen */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}