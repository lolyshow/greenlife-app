import React,{useState,useEffect} from 'react';
import { Text, View,StyleSheet,Dimensions,TouchableOpacity,ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Register from '../../Auth/Register';
import SignIn from '../../Auth/SignIn';
import { Provider, useSelector } from "react-redux";
import { handleActiveTab } from '../../../reduxx/actions/requests';
import { useDispatch } from "react-redux";
const screenHeight = Math.round(Dimensions.get("window").height);




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
        navigation={navigation}
        component={Register}
        options={{ tabBarLabel: 'Create Account' }}
      />
      
    </Tab.Navigator>
  );
}
// export default function MemberAuth({navigation}) {
//   return (
//     <NavigationContainer independent={true}>
//       <MyTabs navigation = {navigation} />
//     </NavigationContainer>
//   );
// }




export default function MemberAuth({navigation,route}) {


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
    handleActiveTab(false)
  }
  

  return (
    <View style= {{backgroundColor:"#FFFFFF",flex:1}}>
      <View style={styles.tabContainer} >
        <View style = {{justifyContent:'space-between',flexDirection:'row',marginTop:20}}>
          
            <TouchableOpacity onPress={switchLoginTab} style = {[loginTab?styles.activeTab:styles.inActive]}>
              <Text>Login</Text>
            </TouchableOpacity>

          <TouchableOpacity onPress={switchRegisterTab} style = {[!loginTab?styles.activeTab:styles.inActive]}>
            <Text>Register</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style = {styles.bodyContent}>
        {loginTab?<SignIn data ={route.params} onclickCreateAccount = {switchRegisterTab} navigation={navigation}/>:<Register data ={route.params} navigation={navigation}/>}
      </ScrollView>


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
    // height:screenHeight,
  }
});