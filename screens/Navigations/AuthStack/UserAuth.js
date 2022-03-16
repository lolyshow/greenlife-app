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



function ProfileScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Profile!</Text>
    </View>
  );
}

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
      <Tab.Screen name="ShopTab" options={{/*tabBarStyle:{display:'none'}, /*showLabel: false,*/ /*headerLeft: null,*/ /*tabBarVisible: false,*/ /*gesturesEnabled: false,*/ headerShown: false }} component={ShopStackNavigator} />
      <Tab.Screen name="Withdrawal" options={{ headerShown: false }} component={WithdrawalStart} />
      <Tab.Screen name="Account" options={{ headerShown: false }} component={AccountStackNavigator} />
      
    </Tab.Navigator>
  );
};


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
      
      <Stack.Screen options={screenOptionStyle} name="GotoProducts" component={Products} />
      <Stack.Screen name="Stores"   component={Stores} />
      <Stack.Screen name="MemberShop" component={MemberShop} />
      
    </Stack.Navigator>
  );
}


function Start({navigation}){
  return (
    <Stack.Navigator
        screenOptions={screenOptionStyle}
    >
      
      {global.gtpsUserData !=undefined && global.gtpsUserData!=null?
        <Stack.Screen screenOptions={screenOptionStyle} name="Products" component={EcommerceStack} />:
      <Stack.Screen options={{title: "User Sign In / SignUp", borderBottomWidth: 0,  headerShown: true, headerStyle :{elevation: 0,
            shadowOpacity: 0}, headerTitleAlign:'center',headerLeft:()=>null, headerBackVisible:false, headerBackTitleVisible: false, headerRight: () => (
            <TouchableOpacity onPress={()=>console.log(navigation)} ><Text style={{fontSize:17}}>X</Text></TouchableOpacity>
          ), }} name="Auth" component={MyTabs} />
      }
      
    
      
    </Stack.Navigator>
  );
}



const Tab = createMaterialTopTabNavigator();

function MyTabs({navigation}) {
  
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
      <Start navigation = {navigation} />
    </NavigationContainer>
  );
}