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
import Logo from "../../assets/chitomeal.png";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  StatusBar: {
    color: "white",
  },
});

export default class Splash extends Component {

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
                    
                        <View style={{shadowOffset: {width: 10, height: 10},shadowColor: '#d9dbda',elevation:2,borderColor:'black',shadowOpacity: 0.9,padding:10}}>
                            <TouchableOpacity onPress={()=>console.log("pressed!!!")} >
                                <View style ={{alignSelf:'center'}}>
                                    <Image resizeMode="stretch"   source={Logo} />
                                </View>
                            </TouchableOpacity>
                            <View>
                                <Text style={{fontSize:20,fontWeight:'bold',}}>My Title</Text>
                                <Text>We at SCTI are professionals ready to handle your tech problems, Be it website creation, app creation on Windows or Android or database management, or even final project/assignment and whatever your n......
                                    <Text style = {{backgroundColor:"#5cb85c",color:"#FFFFFF"}} onPress={()=>console.log("you pressed me!!")}>View Details</Text>
                                </Text>
                            </View>



                            <View style = {{flexDirection:'row', justifyContent:'space-between'}}>

                                <View >
                                    {/* <Text>herer</Text> */}
                                </View>

                                <View style={{paddingTop:20}}>
                                    <ButtonComponent
                                    textinput="View Stores"
                                    buttonWidth={90}
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

                            
                        </View>
                        
                    
                </View>


                <View style = {{padding:20}}>
                    <TouchableOpacity onPress={()=>console.log("pressed!!!")} >
                        <View style={{shadowOffset: {width: 10, height: 10},shadowColor: '#d9dbda',elevation:2,borderColor:'black',shadowOpacity: 0.9,padding:10}}>
                            <View style ={{alignSelf:'center'}}>
                                <Image resizeMode="stretch"   source={Logo} />
                            </View>

                            <View>
                            <Text style={{fontSize:20,fontWeight:'bold',}}>My Title</Text>
                                <Text>We at SCTI are professionals ready to handle your tech problems, Be it website creation, app creation on Windows or Android or database management, or even final project/assignment and whatever your n......
                                    <Text style = {{backgroundColor:"#5cb85c",color:"#FFFFFF"}}>View Details</Text>
                                </Text>
                            </View>
                        </View>
                        
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
  }
}
