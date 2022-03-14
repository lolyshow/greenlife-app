import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Register from '../../Auth/Register';
import SignIn from '../../Auth/SignIn';





function ProfileScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Profile!</Text>
    </View>
  );
}

const Tab = createMaterialTopTabNavigator();

function MyTabs({navigation}) {
  
  return (
    <Tab.Navigator
      initialRouteName="SignIn"
      screenOptions={{
        tabBarActiveTintColor: 'black',
        tabBarLabelStyle: { fontSize: 12 },
        tabBarStyle: { backgroundColor: '#FFF' },
        tabBarIndicatorStyle:{backgroundColor:'#0C9344'}
      }}
    >
      <Tab.Screen
        name="SignIn"
        component={SignIn}
        options={{ tabBarLabel: 'Login',title:"Login"}}
      />
      <Tab.Screen
        name="SignUp"
        component={Register}
        options={{ tabBarLabel: 'Create Account' }}
      />
      
    </Tab.Navigator>
  );
}
export default function LoginStack({navigation}) {
  return (
    <NavigationContainer independent={true}>
      <MyTabs navigation = {navigation} />
    </NavigationContainer>
  );
}