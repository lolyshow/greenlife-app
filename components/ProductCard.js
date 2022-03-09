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

class Productcard extends Component {

  constructor(props) {
    super(props);
  }
  render(){
    return(
        <View style = {{padding:20,}} key={this.props.id}>
                  
          <View style={{justifyContent:"center", shadowOffset: {width: 10, height: 10}, borderRadius:10, shadowColor: '#d9dbda',elevation:2,borderColor:'black',shadowOpacity: 0.9,padding:10,width:160}}>
              <View style={{justifyContent:'space-between',flexDirection:'row'}}>
                <Text style = {{fontSize:12,color:'#0C9344'}}>Stock Status:</Text>
                <View style = {{borderRadius:10,backgroundColor:"#d9dbda",width:70}}>
                  <Text style = {{fontSize:12,textAlign:'center'}}>{this.props.status}</Text>
                </View>
              </View>
              <TouchableOpacity onPress={()=>console.log("pressed!!!")} >
                  <View style ={{alignSelf:'center',justifyContent:'center'}}>
                      <Image resizeMode="contain" style = {{width: 100, height: 100,}}  source={{uri:this.props.filepath}} />
                  </View>
              </TouchableOpacity>
              <View style={{justifyContent:'center'}}>
                  
                  
                  <Text numberOfLines={3} style={{fontSize:12}}>
                  {this.props.desc}
                      <Text style = {{backgroundColor:"#5cb85c",color:"#FFFFFF", fontSize:12}} onPress={this.props.onpressText}>View Details</Text>
                  </Text>
                  <Text style={{fontSize:15,fontWeight:'bold'}}>{this.props.productname}</Text>
                  <Text style={{fontSize:15,fontWeight:'bold'}}>{"\u20A6"}{"cost"}</Text>
              </View>
  
  
  
              <View style = {{ justifyContent:"center"}}>
  
                
  
                  <View style={{paddingTop:20,alignItems:'center'}}>
                    <ButtonComponent
                    textinput={this.props.btn_txt}
                    buttonWidth={120}
                    onPress={() => {this.props.submitForm}}
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
      );
  }
}
export default Productcard;