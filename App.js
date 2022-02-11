import * as React from 'react';
import { View, Text,Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from "./screens/Splash";
import StartScreen from "./screens/Start";
import NextScreen from "./screens/NextScreen";
import SignUp from "./screens/SignUp";
import Login from "./screens/Login";
function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
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
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Start" component={StartScreen} options={{ headerLeft: null, gesturesEnabled: false }}/>
        <Stack.Screen name="NextScreen" component={NextScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Home" component={HomeScreen} />

        {/* NextScreen */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;