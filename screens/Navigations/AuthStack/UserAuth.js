import React,{useState,useEffect} from 'react';
import { Text, View,TouchableOpacity,StyleSheet,Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Register from '../../StoreScreen/Register';
import SignIn from '../../StoreScreen/Login';
import Products from '../../StoreScreen/Products';
import { createStackNavigator } from "@react-navigation/stack";
import Stores from '../../StoreScreen/Stores';
import MemberShop from '../../StoreScreen/MemberShop';
import { Provider, useSelector } from "react-redux";
import { handleActiveTab } from '../../../reduxx/actions/requests';
import { useDispatch } from "react-redux";
import ProductDetails from '../../StoreScreen/ProductDetails';
const screenHeight = Math.round(Dimensions.get("window").height);

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
export function EcommerceStack({navigation,route,myname=null,data=null}) {
  const {userLoggedIn,gotoStore} = useSelector((state) => state.authReducer);
  return (
    <Stack.Navigator
        screenOptions={screenOptionStyle}
    >
      
      {gotoStore.gotoStore && userLoggedIn?
        (<>
          <Stack.Screen name="Stores">
            {props=><Stores {...props} route = {gotoStore} data ={route} myname = {"philsvibeinhnhnh"}/>}
          </Stack.Screen>
          
          
          {/* <Stack.Screen options={screenOptionStyle} name="GotoProducts" component={Products} />
          <Stack.Screen name="ProductDetails" component={ProductDetails} />
          <Stack.Screen name="MemberShop" component={MemberShop} /> */}
        </>
        ):

        (
          
          <>
          
          <Stack.Screen options={screenOptionStyle} name="GotoProducts" component={Products} />
          <Stack.Screen name="Stores"   component={Stores} />
          <Stack.Screen name="MemberShop" component={MemberShop} />
          <Stack.Screen name="ProductDetails" component={ProductDetails} />
          
          </>
        
        )
      
      
      }

      
    </Stack.Navigator>
  );
}

export function ContinueToStoreStack({navigation,route}){
  return (
    <Stack.Navigator
        screenOptions={screenOptionStyle}
    >
        <Stack.Screen  screenOptions={screenOptionStyle}  name="Products"  >
          {props=><EcommerceStack {...props} navigation = {navigation} data ={route} myname = {"philsvibe"}/>}
        </Stack.Screen>
        {/* <Stack.Screen options={{title: "User Sign In / SignUp", borderBottomWidth: 0,  headerShown: false, headerStyle :{elevation: 0,
            shadowOpacity: 0}, headerTitleAlign:'center',headerLeft:()=>null, headerBackVisible:false, headerBackTitleVisible: false, headerRight: () => (null
            // <TouchableOpacity onPress={()=>console.log(navigation)} ><Text style={{fontSize:17}}>X</Text></TouchableOpacity>
          ), }} name="Auth" navigation = {navigation} data ={route} component={UserAuth} /> */}

          <Stack.Screen options={{title: "User Sign In / SignUp", borderBottomWidth: 0,  headerShown: false, headerStyle :{elevation: 0,
            shadowOpacity: 0}, headerTitleAlign:'center',headerLeft:()=>null, headerBackVisible:false, headerBackTitleVisible: false, headerRight: () => (null
            // <TouchableOpacity onPress={()=>console.log(navigation)} ><Text style={{fontSize:17}}>X</Text></TouchableOpacity>
          ), }} name="Auth">
            {props=><UserAuth {...props} navigation = {navigation} data ={route} myname = {"philsvibe"}/>}
              
          </Stack.Screen>

    </Stack.Navigator>
  );
}







// export default function UserAuth({navigation}) {
//   return (
//     <NavigationContainer independent={true}>
//       <AuthStart navigation = {navigation} />
//     </NavigationContainer>
//   );
// }

  

export default function UserAuth({navigation,route}) {


  // useEffect(() => {
  //   setLogin(true)
  // });
  const [type, settype] = useState('login');
  const [register, setRegister] = useState(false);
  const [login, setLogin] = useState(true);
  const {loginTab} = useSelector((state) => state.appReducer);
  const dispatch = useDispatch()
  function switchLoginTab(){
    // setLogin(prev => !prev);
    
      dispatch(
        handleActiveTab(true)
      )
    
  }

  function switchRegisterTab(){
    // setLogin(prev => !prev);
    
      dispatch(
        handleActiveTab(false)
      )
    
    
  }
  const createAccount =()=>{
    setLogin(false);
  }
  

  return (
    <View>
      <View style={styles.tabContainer} >
        <View style = {{justifyContent:'space-between',flexDirection:'row',marginTop:40}}>
          
            <TouchableOpacity onPress={switchLoginTab} style = {[loginTab?styles.activeTab:styles.inActive]}>
              <Text>Login</Text>
            </TouchableOpacity>

          <TouchableOpacity onPress={switchRegisterTab} style = {[!loginTab?styles.activeTab:styles.inActive]}>
            <Text>Register</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style = {styles.bodyContent}>
        {loginTab?<SignIn data ={route.params} onclickCreateAccount = {createAccount} navigation={navigation}/>: <Register data ={route.params} navigation={navigation}/>}
      </View>


    </View>
  );
}






const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
  },
  inActive:{flex:1,alignItems:'center',padding:10},
  StatusBar: {
    color: "#FFF",
  },
  activeTab:{borderBottomColor:"#0C9344", borderBottomWidth:2,flex:1,alignItems:'center',padding:10},
  tabContainer:{backgroundColor: '#fff',shadowColor: '#000',shadowOffset: { width: 1, height: 1 },shadowOpacity:  0.4,
    shadowRadius: 3,
    elevation: 5,
  },
  bodyContent:{
    height:screenHeight,
  }
});