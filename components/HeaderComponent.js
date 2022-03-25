import React from "react";
import { View, Button, StyleSheet, TouchableOpacity, Text } from "react-native";
import ToggleDrawerBtn from "./ToggleDrawerBtn";
import {useTheme,Avatar,Title,Caption,Paragraph,Drawer,TouchableRipple} from 'react-native-paper';
import BackBtn from "./BackBtn";
import { Provider, useSelector } from "react-redux";
const HeaderComponent = ({ onPress, memberId,headerType, textinput, size, buttonWidth, backgroundColor,borderRadius,textColor,borderWidth,borderColors,boldText }) => {
    const {name,memberid} = useSelector((state) => state.appReducer.userDetails.response);
    return (
headerType && headerType == "home"?  
<View style = {styles.headerContainer2}>
    <View>
        {/* <Text onPress = {this.toggleNav}>LeftIcon</Text> */}
        <ToggleDrawerBtn 
            onPress = {onPress}
        />
    </View>

    <View>
        <Text style = {{fontSize:12, color:"#979797",textAlign:'center'}}>Member ID</Text>
        <Text style = {{textAlign:'center'}}>{memberid}</Text>
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

    <View style = {{}}>
        <Text style = {{fontSize:12, color:"#979797",textAlign:'center'}}>Member ID</Text>
        <Text style = {{textAlign:'center'}}>{memberid}</Text>
    </View>

    <View style = {{width:40,}}>
            
    </View>

</View>)


};

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

export default HeaderComponent;