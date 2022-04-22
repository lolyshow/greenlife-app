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
let currency = require('currency.js');
const NGN = value => currency(value, {precision: 0, symbol: ''});
const Productcard = ({count,filepath,desc,productname,cost,btn_txt,onpressText,submitForm})=>{
    return(
        <View>
          <View style = {{alignItems:'center'}} key={count}>
                    
            <View style={{justifyContent:"center", shadowOffset: {width: 10, height: 10}, borderRadius:10, shadowColor: '#d9dbda',elevation:2,borderColor:'black',shadowOpacity: 0.9,padding:10,width:150,}}>
                <View style={{justifyContent:'space-between',flexDirection:'row'}}>
                  <Text style = {{fontSize:10,color:'#0C9344',fontWeight:'bold'}}>Stock Status:</Text>
                  <View style = {{borderRadius:10,backgroundColor:"#d9dbda",width:65}}>
                    <Text style = {{fontSize:10,textAlign:'center'}}>{"Available"}</Text>
                  </View>
                </View>
                <TouchableOpacity onPress={()=>{onpressText}} >
                    <View style ={{alignSelf:'center',justifyContent:'center',marginTop:10}}>
                        <Image resizeMode="contain" style = {{width: 80, height: 80,}}  source={{uri:filepath}} />
                    </View>
                </TouchableOpacity>
                <View style={{justifyContent:'center'}}>
                    
                  <TouchableOpacity onPress={onpressText}> 
                    <Text numberOfLines={3} style={{fontSize:10}}>
                    {desc}
                        <Text style = {{backgroundColor:"#5cb85c",color:"#FFFFFF", fontSize:12}}>View Details</Text>
                    </Text>
                    <Text style={{fontSize:10,fontWeight:'bold'}}>{productname}</Text>
                    <Text style={{fontSize:10,fontWeight:'bold'}}>{"\u20A6"}{NGN(cost).format()}</Text>
                  </TouchableOpacity> 
                </View>
    
    
    
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