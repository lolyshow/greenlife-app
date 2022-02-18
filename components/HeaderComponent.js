import React from "react";
import { View, Button, StyleSheet, TouchableOpacity, Text } from "react-native";
import BackBtn from "./BackBtn";
const HeaderComponent = ({ onPress, memberId, textinput, size, buttonWidth, backgroundColor,borderRadius,textColor,borderWidth,borderColors,boldText }) => (
    
<View style = {styles.headerContainer}>

    <View>
        <BackBtn 
            onPress = {onPress}
        />
    </View>

    <View style = {{marginLeft:100}}>
        <Text style = {{fontSize:12, color:"#979797",textAlign:'center'}}>Member ID</Text>
        <Text style = {{textAlign:'center'}}>{memberId}</Text>
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
   
 
  });

export default HeaderComponent;