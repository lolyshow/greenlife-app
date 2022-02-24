import React from "react";
import { View, Button, StyleSheet, TouchableOpacity, Text } from "react-native";
import ToggleDrawerBtn from "./ToggleDrawerBtn";
import {useTheme,Avatar,Title,Caption,Paragraph,Drawer,TouchableRipple} from 'react-native-paper';
import BackBtn from "./BackBtn";
const HeaderComponent = ({ onPress, memberId,headerType, textinput, size, buttonWidth, backgroundColor,borderRadius,textColor,borderWidth,borderColors,boldText }) => (
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
        <Text style = {{textAlign:'center'}}>{global.user.memberid?global.user.memberid:"............"}</Text>
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

    <View style = {{marginLeft:100}}>
        <Text style = {{fontSize:12, color:"#979797",textAlign:'center'}}>Member ID</Text>
        <Text style = {{textAlign:'center'}}>{global.user.memberid?global.user.memberid:"................"}</Text>
    </View>

</View>


);

const styles = StyleSheet.create({
    container: {
      flex: 0.85,
      padding:20,
    },
    headerContainer:{
      marginTop:40,
      marginBottom:20,
      flexDirection:'row',
    },
  headerContainer2:{
    marginTop:40,
    marginBottom:20,
    justifyContent:'space-between',
    flexDirection:'row',
  },
   
 
  });

export default HeaderComponent;