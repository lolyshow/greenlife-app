import React from "react";
import { View, Button, StyleSheet, TouchableOpacity, Text } from "react-native";
import ToggleDrawerBtn from "./ToggleDrawerBtn";
import {useTheme,Avatar,Title,Caption,Paragraph,Drawer,TouchableRipple} from 'react-native-paper';
import BackBtn from "./BackBtn";
import AntDesign from "react-native-vector-icons/AntDesign";
const EcommerceHeader = ({ onPress, title, loggedin, memberId,headerType,onpressLogout, textinput, size, buttonWidth, backgroundColor,borderRadius,textColor,borderWidth,borderColors,boldText }) => (
headerType && headerType == "home"?  
<View style = {styles.headerContainer2}>
    <View>
        {/* <Text onPress = {this.toggleNav}>LeftIcon</Text> */}
        <ToggleDrawerBtn 
            onPress = {onPress}
        />
    </View>

    <View>
        <Text style = {{fontSize:16, fontWeight:'bold', color:"#979797",textAlign:'center'}}>{title}</Text>
        <Text style = {{textAlign:'center'}}></Text>
    </View>

    <View>
        <Avatar.Image 
            source={require('../assets/avatar2.jpg')}
            size={40}
        />
    </View>

</View>
:
<View style = {styles.headerContainer}>

    <View>
        <BackBtn 
            onPress = {onPress}
        />
    </View>

    <View style = {{justifyContent:'center',}}>
        <Text style = {{fontSize:16, fontWeight:'bold', color:"#FFF",textAlign:'center',}}>{title}</Text>
        
    </View>
    {loggedin?
        <View style = {{justifyContent:'center',}}>
            
            <TouchableOpacity onPress={onpressLogout}>
                <AntDesign color={"#FFF"} size = {35} name = "logout" />
            </TouchableOpacity>
        </View>:
        <View style = {{justifyContent:'center',width:48}}>
            
            
        </View>
    }

</View>


);

const styles = StyleSheet.create({
    container: {
      flex: 0.85,
      padding:20,
    },
    headerContainer:{
      marginTop:Platform.OS == "android"?10:40,
      marginBottom:20,
      flexDirection:'row',
      justifyContent:'space-between'
    },
  headerContainer2:{
    marginTop:Platform.OS == "android"?10:40,    marginBottom:20,
    justifyContent:'space-between',
    flexDirection:'row',
  },
   
 
  });

export default EcommerceHeader;