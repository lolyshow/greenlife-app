import React, { Component } from "react";

import {
  StyleSheet,
  Dimensions,
  Image,
  StatusBar,
  ImageBackground,
  View,Alert,Text,TouchableOpacity,ScrollView,ActivityIndicator,
} from "react-native";
import { cos } from "react-native-reanimated";
import ButtonComponent from "../components/ButtonComponent";

const Productcard = ({count,filepath,desc,productname,cost,btn_txt,onpressText,submitForm})=>{
    return(
        <View>
          <View style = {{alignItems:'center'}} key={count}>
                    
            <View style={{justifyContent:"center", shadowOffset: {width: 10, height: 10}, borderRadius:10, shadowColor: '#d9dbda',elevation:2,borderColor:'black',shadowOpacity: 0.9,padding:10,width:150,}}>
                
    
    
    
                <View style = {{ justifyContent:"center"}}>
    
                  
    
                    <View style={{paddingTop:10,alignItems:'center'}}>
                      <ButtonComponent
                      textinput={btn_txt}
                      buttonWidth={120}
                      onPress={submitForm}
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
          
         </View> 
      );
  
}
export default Productcard;