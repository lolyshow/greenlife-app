import React, { Component,useState } from "react";

import {
  StyleSheet,
  Dimensions,
  Image,
  StatusBar,
  ImageBackground,
  View,Alert,Text,TouchableOpacity,ScrollView,
} from "react-native";
import Helper from "../../Helpers/Helper";
import ButtonComponent from "../../components/ButtonComponent";
const screenWidth = Math.round(Dimensions.get("window").width);

const screenHeight = Math.round(Dimensions.get("window").height);
// import { store } from "../redux/store";

// import logoWatermark from "../assets/logoWatermark.png";

// import Logo from "../../assets/logo2.png";
import Logo from "../../assets/store.png";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  StatusBar: {
    color: "white",
  },
   Card:{
    borderRadius:5,
    padding:20,
    height:200,
    marginTop:10,
    marginBottom:20,
    backgroundColor:"#97ADB6",
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
});

export default class Stores extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      storedCredentials: "",
      appReady: false,
      
    };
  }

  componentDidMount() {

}

  
  submitForm =()=>{
    console.log("myEmailIsKukuHere", global.gtpsUserData.email)
    {global.gtpsUserData !=undefined && global.gtpsUserData!=null?
    
    this.props.navigation.navigate("Store"):
    this.props.navigation.navigate("Register");
    
    }
  }

  

  onSwipePerformed = (action) => {
    switch (action) {
      
      default: {
        this.gotToNextScreen();
      }
    }
  };
  render() {
    return (
      
        <View style={styles.container}>
                
            <ScrollView>
                

                <View style = {{padding:20}}>
                    <View style = {styles.Card}>
                        {/* <Text style = {{fontWeight:'bold', fontSize:20}}>Hello, {processing?"........":fullname?fullname:"......"}</Text> */}
                        <Text style = {{}}>Welcome to GTPS Online Stores </Text>

                        <Text style = {{marginTop:10,}}>We know our frustrating it is to need something but can't afford; and even more frustrating to have the means and not find exactly what you need. At GTPS, we need connect you to e-stores that will provide you with what you need..

                        </Text>
                        
                        {/* <Text style = {{marginTop:10,}}>For easy implementation, we are piloting this service in Nigeria first.</Text> */}
                    </View>

                    <View><Text style = {{fontWeight:'bold',fontSize:20}}>Stores selling: Danshen Plus:</Text></View>
                    <View style={{shadowOffset: {width: 10, height: 10},shadowColor: '#d9dbda',elevation:2,borderColor:'black',shadowOpacity: 0.9,padding:10,width:160}}>
                        <TouchableOpacity onPress={()=>console.log("pressed!!!")} >
                            <View style ={{justifyContent:"center"}}>
                                <Image resizeMode="stretch" size={20}   source={Logo} />
                            </View>
                        </TouchableOpacity>
                        <View>
                            <Text style={{fontSize:12}} numberOfLines={3}>We at SCTI are professionals ready to handle your tech problems, Be it website creation, app creation on Windows or Android or database management, or even final project/assignment and whatever your n......
                            
                            </Text>
                            <Text style={{fontSize:20,fontWeight:'bold',}}>$50,000</Text>
                            <Text style={{fontSize:15,fontWeight:'bold',}}>Elarger Med</Text>
                            <View style ={{alignItems:'center',marginTop:20}}>
                              <ButtonComponent
                                textinput="View Store"
                                buttonWidth={130}
                                onPress={() => this.submitForm()}
                                size ={"sm"}
                                backgroundColor = {"#337ab7"}
                                borderRadius = {8}
                                textColor={"#FFFFFF"}
                                borderWidth = {1}
                                borderColors = {"#FFFFFF"}

                                />
                              </View>
                            
                        </View>



                        {/* <View style = {{flexDirection:'row', justifyContent:'space-between'}}>

                            <View style={{paddingTop:20}}>
                                <ButtonComponent
                                    textinput="Click to Call"
                                    buttonWidth={100}
                                    onPress={() => this.submitForm()}
                                    size ={"sm"}
                                    backgroundColor = {"#337ab7"}
                                    borderRadius = {8}
                                    textColor={"#FFFFFF"}
                                    borderWidth = {1}
                                    borderColors = {"#FFFFFF"}

                                    />
                            </View>

                            <View style={{paddingTop:20}}>
                                <ButtonComponent
                                textinput="View Stores"
                                buttonWidth={100}
                                onPress={() => this.submitForm()}
                                size ={"sm"}
                                backgroundColor = {"#5cb85c"}
                                borderRadius = {8}
                                textColor={"#FFFFFF"}
                                borderWidth = {1}
                                borderColors = {"#FFFFFF"}

                                />
                            </View>


                            

                        </View> */}

                        
                    </View>
                        
                    
                </View>
            </ScrollView>
        </View>
    );
  }
}
