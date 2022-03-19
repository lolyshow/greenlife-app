import * as React from 'react';
import { Text, View,TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Register from '../../StoreScreen/Register';
import SignIn from '../../StoreScreen/Login';
import Products from '../../StoreScreen/Products';
import { createStackNavigator } from "@react-navigation/stack";
import Stores from '../../StoreScreen/Stores';
import MemberShop from '../../StoreScreen/MemberShop';


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


const Stack = createStackNavigator();
export const EcommerceStack = () => {
  return (
    <Stack.Navigator
        screenOptions={screenOptionStyle}
    >
      
      {!global.gotoStore?

        (
          <>
          <Stack.Screen options={screenOptionStyle} name="GotoProducts" component={Products} />
          <Stack.Screen name="Stores"   component={Stores} />
          <Stack.Screen name="MemberShop" component={MemberShop} />
          </>
        
        ):
      <>
        <Stack.Screen name="Stores"   component={Stores} />
        
        <Stack.Screen name="MemberShop" component={MemberShop} />
        <Stack.Screen options={screenOptionStyle} name="GotoProducts" component={Products} />
      </>
      }
    </Stack.Navigator>
  );
}


function AuthStart({navigation}){
  return (
    <Stack.Navigator
        screenOptions={screenOptionStyle}
    >
    {global.gtpsUserData !=undefined && global.gtpsUserData!=null?
      <Stack.Screen screenOptions={screenOptionStyle} name="Products" component={EcommerceStack} />:
      <>
      <Stack.Screen options={{title: "User Sign In / SignUp", borderBottomWidth: 0,  headerShown: true, headerStyle :{elevation: 0,
            shadowOpacity: 0}, headerTitleAlign:'center',headerLeft:()=>null, headerBackVisible:false, headerBackTitleVisible: false, headerRight: () => (
            <TouchableOpacity onPress={()=>console.log(navigation)} ><Text style={{fontSize:17}}>X</Text></TouchableOpacity>
          ), }} name="Auth" component={AuthStack} />
      <Stack.Screen screenOptions={screenOptionStyle} name="Products" component={EcommerceStack} />
      </>
    }
    </Stack.Navigator>
  );
}


export function ContinueToStoreStack({navigation}){
  return (
    <Stack.Navigator
        screenOptions={screenOptionStyle}
    >
        <Stack.Screen screenOptions={screenOptionStyle} name="Products" component={EcommerceStack} />
        <Stack.Screen options={{title: "User Sign In / SignUp", borderBottomWidth: 0,  headerShown: true, headerStyle :{elevation: 0,
            shadowOpacity: 0}, headerTitleAlign:'center',headerLeft:()=>null, headerBackVisible:false, headerBackTitleVisible: false, headerRight: () => (
            <TouchableOpacity onPress={()=>console.log(navigation)} ><Text style={{fontSize:17}}>X</Text></TouchableOpacity>
          ), }} name="Auth" component={AuthStack} />
    </Stack.Navigator>
  );
}






const Tab = createMaterialTopTabNavigator();

function AuthStack({navigation}) {
  
  return (
    <Tab.Navigator
      // initialRouteName="SignIn"
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
export default function UserAuth({navigation}) {
  return (
    <NavigationContainer independent={true}>
      <AuthStart navigation = {navigation} />
    </NavigationContainer>
  );
}